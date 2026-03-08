"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const ANDROID_DOWNLOAD_URL = "https://www.fir021.org/cXHLd";

type ShareTargetType = "city" | "meetup" | "travel-plan" | "unknown";

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
	const mobile = useMemo(() => isMobileDevice(), []);

	useEffect(() => {
		if (!mobile || !appScheme) {
			if (!mobile) {
				setShowFallback(true);
			}
			return;
		}

		let cancelled = false;
		const fallbackTimer = window.setTimeout(() => {
			if (cancelled || document.visibilityState === "hidden") {
				return;
			}

			setShowFallback(true);
			setToast("未检测到已安装的行途 App，请先安装后再打开分享内容。");
		}, 1600);

		window.location.href = appScheme;

		const handleVisibilityChange = () => {
			if (document.visibilityState === "hidden") {
				window.clearTimeout(fallbackTimer);
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			cancelled = true;
			window.clearTimeout(fallbackTimer);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [appScheme, mobile]);

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
						如果手机已经安装行途，系统会自动拉起
						App；如果没有安装，页面会保留在这里并给出下载入口。
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						{appScheme ? (
							<a className="btn btn-primary" href={appScheme}>
								重新打开 App
							</a>
						) : (
							<button className="btn btn-primary" type="button" disabled>
								分享链接缺少内容标识
							</button>
						)}
						<Link className="btn btn-outline" href="/">
							返回官网
						</Link>
					</div>

					{showFallback && (
						<div className="mt-8 rounded-3xl border border-warning/20 bg-warning/10 p-5 text-left">
							<h2 className="text-lg font-bold text-base-content">
								未安装 App？
							</h2>
							<p className="mt-2 text-sm leading-6 text-base-content/70">
								当前设备没有成功拉起行途。你可以先安装 Android
								版，安装完成后回到本页再次打开。
							</p>
							<div className="mt-4 flex flex-wrap gap-3">
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
