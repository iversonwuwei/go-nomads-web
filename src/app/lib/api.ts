// ============================================================
// Go Nomads Web — API 工具层
// 后端基地址：https://api.go-nomads.com/api/v1
// ============================================================

const API_BASE = "https://api.go-nomads.com/api/v1";

// ─── 通用响应信封 ────────────────────────────────────
interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T | null;
	errors: string[];
}

// ─── 法律文档类型 ────────────────────────────────────
export interface LegalSection {
	title: string;
	content: string;
}

export interface LegalSummary {
	icon: string;
	title: string;
	content: string;
}

export interface LegalSdkInfo {
	name: string;
	company: string;
	purpose: string;
	dataCollected: string[];
	privacyUrl: string;
}

export interface LegalDocument {
	id: string;
	documentType: string;
	version: string;
	language: string;
	title: string;
	effectiveDate: string;
	isCurrent: boolean;
	sections: LegalSection[];
	summary: LegalSummary[];
	sdkList: LegalSdkInfo[];
}

// ─── 获取隐私政策（Server Component 用，带 ISR 缓存） ───
export async function fetchPrivacyPolicy(
	lang = "zh",
): Promise<LegalDocument | null> {
	try {
		const res = await fetch(
			`${API_BASE}/users/legal/privacy-policy?lang=${lang}`,
			{ next: { revalidate: 3600 } }, // 每小时重新验证
		);

		if (!res.ok) return null;

		const body: ApiResponse<LegalDocument> = await res.json();
		return body.success ? body.data : null;
	} catch (e) {
		console.error("❌ 获取隐私政策失败:", e);
		return null;
	}
}

// ─── 获取隐私政策（客户端组件用，无 ISR） ─────────────
export async function fetchPrivacyPolicyClient(
	lang = "zh",
): Promise<LegalDocument | null> {
	try {
		const res = await fetch(
			`${API_BASE}/users/legal/privacy-policy?lang=${lang}`,
		);

		if (!res.ok) return null;

		const body: ApiResponse<LegalDocument> = await res.json();
		return body.success ? body.data : null;
	} catch (e) {
		console.error("❌ 获取隐私政策失败:", e);
		return null;
	}
}
