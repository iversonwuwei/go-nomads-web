"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const ANDROID_DOWNLOAD_URL = "https://www.fir021.org/cXHLd";

type ShareTargetType = "city" | "meetup" | "travel-plan" | "unknown";
type BrowserEnvironment = "normal" | "wechat" | "qq" | "weibo";
type FallbackMode =
	| "desktop"
	| "missing-link"
	| "embedded-browser"
	| "launch-failed";

function resolveTargetType(slug: string | undefined): ShareTargetType {
	if (!slug) {
		return "unknown";
	}

	switch (slug) {
		case "city-detail":
			return "city";
		case "meetup-detail":
			return "meetup";
		case "travel-plan":
			return "travel-plan";
		default:
			return "unknown";
	}
}

function buildAppScheme(
	type: ShareTargetType,
	id: string | null,
): string | null {
	if (!id) {
		return null;
	}

	switch (type) {
		case "city":
			return `gonomads://city?id=${encodeURIComponent(id)}`;
		case "meetup":
			return `gonomads://meetup?id=${encodeURIComponent(id)}`;
		case "travel-plan":
			return `gonomads://travel-plan?id=${encodeURIComponent(id)}`;
		default:
			return null;
	}
}

function resolveRouteSegment(type: ShareTargetType): string | null {
	switch (type) {
		case "city":
			return "city-detail";
		case "meetup":
			return "meetup-detail";
		case "travel-plan":
			return "travel-plan";
		default:
			return null;
	}
}

function buildUniversalLink(
	type: ShareTargetType,
	id: string | null,
): string | null {
	const routeSegment = resolveRouteSegment(type);
	if (!routeSegment || !id) {
		return null;
	}

	return `https://go-nomads.com/app/${routeSegment}/${encodeURIComponent(id)}`;
}

function buildAndroidIntentLink(
	type: ShareTargetType,
	id: string | null,
	fallbackUrl: string | null,
): string | null {
	if (!id || !fallbackUrl) {
		return null;
	}

	switch (type) {
		case "city":
			return `intent://city?id=${encodeURIComponent(id)}#Intent;scheme=gonomads;package=com.gonomads.go_nomads_app;S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;
		case "meetup":
			return `intent://meetup?id=${encodeURIComponent(id)}#Intent;scheme=gonomads;package=com.gonomads.go_nomads_app;S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;
		case "travel-plan":
			return `intent://travel-plan?id=${encodeURIComponent(id)}#Intent;scheme=gonomads;package=com.gonomads.go_nomads_app;S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;
		default:
			return null;
	}
}

function getTargetLabel(type: ShareTargetType): string {
	switch (type) {
		case "city":
			return "城市详情";
		case "meetup":
			return "活动详情";
		case "travel-plan":
			return "旅行计划";
		default:
			return "分享内容";
	}
}

function isMobileDevice(): boolean {
	if (typeof navigator === "undefined") {
		return false;
	}

	return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

function isAndroidDevice(): boolean {
	if (typeof navigator === "undefined") {
		return false;
	}

	return /Android/i.test(navigator.userAgent);
}

function detectBrowserEnvironment(): BrowserEnvironment {
	if (typeof navigator === "undefined") {
		return "normal";
	}

	const userAgent = navigator.userAgent;
	if (/MicroMessenger/i.test(userAgent)) {
		return "wechat";
	}

	if (/QQ\//i.test(userAgent) || /MQQBrowser/i.test(userAgent)) {
		return "qq";
	}

	if (/Weibo/i.test(userAgent)) {
		return "weibo";
	}

	return "normal";
}

function getBlockedEnvironmentLabel(environment: BrowserEnvironment): string {
	switch (environment) {
		case "wechat":
			return "微信";
		case "qq":
			return "QQ";
		case "weibo":
			return "微博";
		default:
			return "当前浏览器";
	}
}

export default function ShareLandingPage() {
	const params = useParams<{ slug?: string[] }>();
	const searchParams = useSearchParams();
	const [toast, setToast] = useState<string | null>(null);
	const [showFallback, setShowFallback] = useState(false);

	const slug = params.slug ?? [];
	const primarySegment = slug[0];
	const pathId = slug.length > 1 ? slug[1] : null;
	const targetId = searchParams.get("id") ?? pathId;
	const targetType = resolveTargetType(primarySegment);
	const targetLabel = getTargetLabel(targetType);
	const appScheme = useMemo(
		() => buildAppScheme(targetType, targetId),
		[targetId, targetType],
	);
	const universalLink = useMemo(
		() => buildUniversalLink(targetType, targetId),
		[targetId, targetType],
	);
	const androidIntentLink = useMemo(
		() => buildAndroidIntentLink(targetType, targetId, universalLink),
		[targetId, targetType, universalLink],
	);
	const mobile = useMemo(() => isMobileDevice(), []);
	const android = useMemo(() => isAndroidDevice(), []);
	const browserEnvironment = useMemo(() => detectBrowserEnvironment(), []);
	const embeddedBrowser = browserEnvironment !== "normal";
	const openAppHref = android ? (androidIntentLink ?? appScheme) : appScheme;
	const environmentLabel = getBlockedEnvironmentLabel(browserEnvironment);
	const fallbackMode: FallbackMode | null = showFallback
		? "launch-failed"
		: !mobile
			? "desktop"
			: !openAppHref
				? "missing-link"
				: embeddedBrowser
					? "embedded-browser"
					: null;

	useEffect(() => {
		if (!mobile || !openAppHref) {
			return;
		}

		if (embeddedBrowser) {
			return;
		}

		let cancelled = false;
		const fallbackTimer = window.setTimeout(() => {
			if (cancelled || document.visibilityState === "hidden") {
				return;
			}

			setShowFallback(true);
			setToast("没有成功拉起行途 App。这通常是浏览器拦截了打开请求，不一定代表 App 未安装。你可以手动重试，或先在系统浏览器中打开。");
		}, 2200);

		window.location.href = openAppHref;

		const clearFallbackTimer = () => {
			window.clearTimeout(fallbackTimer);
		};

		const handleVisibilityChange = () => {
			if (document.visibilityState === "hidden") {
				clearFallbackTimer();
			}
		};

		const handlePageHide = () => {
			clearFallbackTimer();
		};

		const handleBlur = () => {
			clearFallbackTimer();
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);
		window.addEventListener("pagehide", handlePageHide);
		window.addEventListener("blur", handleBlur);

		return () => {
			cancelled = true;
			clearFallbackTimer();
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			window.removeEventListener("pagehide", handlePageHide);
			window.removeEventListener("blur", handleBlur);
		};
	}, [embeddedBrowser, mobile, openAppHref]);

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,119,71,0.18),_transparent_42%),linear-gradient(180deg,_#fff8f2_0%,_#fff_48%,_#f7f7f5_100%)] text-base-content">
			<div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-12">
				<div className="rounded-[32px] border border-base-200 bg-white/90 p-8 shadow-[0_24px_80px_rgba(33,33,33,0.08)] backdrop-blur">
					<div className="badge badge-primary badge-lg mb-5">行途分享卡片</div>
					<h1 className="text-3xl font-black tracking-tight text-base-content sm:text-4xl">
						正在打开行途 App
					</h1>
					<p className="mt-4 text-base leading-7 text-base-content/70">
						目标内容：{targetLabel}
						{targetId ? ` #${targetId}` : ""}
					</p>
					<p className="mt-2 text-sm leading-6 text-base-content/55">
						如果设备支持直接唤起，页面会自动打开行途 App；未成功打开时，
						你仍可以在这里继续手动操作。
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						{openAppHref ? (
							<a className="btn btn-primary" href={openAppHref}>
								立即打开行途 App
							</a>
						) : (
							<button className="btn btn-primary" type="button" disabled>
									当前链接不可直接打开
							</button>
						)}
						<Link className="btn btn-outline" href="/">
							返回官网
						</Link>
					</div>

					{fallbackMode && (
						<div className="mt-8 rounded-3xl border border-warning/20 bg-warning/10 p-5 text-left">
							<h2 className="text-lg font-bold text-base-content">
								{fallbackMode === "embedded-browser"
									? `${environmentLabel}内暂不支持直接拉起`
									: fallbackMode === "missing-link"
										? "分享链接信息不完整"
										: fallbackMode === "desktop"
											? "请在手机上继续打开"
											: "暂时未能打开 App"}
							</h2>
							<p className="mt-2 text-sm leading-6 text-base-content/70">
								{fallbackMode === "embedded-browser"
									? `你当前是在${environmentLabel}内置浏览器中打开分享卡片。该环境通常会拦截 App 唤起，所以这里不能准确判断是否已安装行途。请先使用右上角菜单，选择“在浏览器打开”或“在 Safari 中打开”，再返回重试。`
									: fallbackMode === "missing-link"
										? "当前分享链接缺少必要的内容参数，页面暂时无法定位要打开的城市、活动或旅行计划。请重新生成分享链接后再试。"
										: fallbackMode === "desktop"
											? "当前是桌面浏览器环境，无法直接拉起手机里的行途 App。请把这条链接发送到手机，或在手机浏览器中重新打开。"
											: "页面暂时没有成功拉起行途 App。这通常是浏览器拦截了打开请求，并不一定代表 App 未安装。你可以手动再次打开，或切换到系统浏览器后重试。"}
							</p>
							<div className="mt-4 flex flex-wrap gap-3">
								{universalLink && (
									<a className="btn btn-outline btn-sm" href={universalLink}>
										使用通用链接重试
									</a>
								)}
								<a
									className="btn btn-primary btn-sm"
									href={ANDROID_DOWNLOAD_URL}
									target="_blank"
									rel="noreferrer noopener"
								>
									下载 Android 版
								</a>
								<button
									className="btn btn-ghost btn-sm"
									type="button"
									onClick={() => setToast("iOS 版本暂未上架，敬请期待！")}
								>
									iOS 安装说明
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			{toast && (
				<div className="toast toast-top toast-center z-[60]">
					<div className="alert alert-info shadow-lg">
						<span>{toast}</span>
					</div>
				</div>
			)}
		</div>
	);
}
