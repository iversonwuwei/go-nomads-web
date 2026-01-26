"use client";

import {
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  MapPinIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState, type JSX } from "react";

const features = [
  {
    title: "发现目的地",
    description: "探索全球热门数字游民城市，查看生活成本、网络速度等详细信息",
    icon: MapPinIcon,
    image: "/funcs/discover.png",
  },
  {
    title: "共享办公",
    description: "精选各地优质共享办公空间，WiFi、环境、价格一目了然",
    icon: GlobeAltIcon,
    image: "/funcs/cowork.png",
  },
  {
    title: "社区活动",
    description: "参与当地数字游民聚会，结识志同道合的朋友",
    icon: UserGroupIcon,
    image: "/funcs/community.png",
  },
  {
    title: "行程规划",
    description: "AI 智能规划旅行路线，让每一次出发都更加从容",
    icon: CalendarDaysIcon,
    image: "/funcs/planner.png",
  },
  {
    title: "即时交流",
    description: "与社区成员实时聊天，分享经验、寻求帮助",
    icon: ChatBubbleLeftRightIcon,
    image: "/funcs/chat.png",
  },
  {
    title: "随时随地",
    description: "iOS 和 Android 双平台支持，旅途中也能轻松使用",
    icon: DevicePhoneMobileIcon,
    image: "/funcs/mobile.png",
  },
];

const screenshots = [
  { src: "/screenshots/1.png", alt: "首页界面" },
  { src: "/screenshots/2.png", alt: "城市详情" },
  { src: "/screenshots/3.png", alt: "共享办公" },
  { src: "/screenshots/4.png", alt: "活动列表" },
  { src: "/screenshots/5.png", alt: "行程规划" },
  { src: "/screenshots/6.png", alt: "社区交流" },
];

const ANDROID_DOWNLOAD_URL = "https://www.fir021.org/cXHLd";

export default function Home() {
  const [modal, setModal] = useState<"about" | "privacy" | "terms" | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const modalTitle: Record<Exclude<typeof modal, null>, string> = {
    about: "关于我们",
    privacy: "隐私政策",
    terms: "使用条款",
  };

  const modalBody: Record<Exclude<typeof modal, null>, JSX.Element> = {
    about: (
      <div className="space-y-3 text-sm text-base-content/80">
        <p>行途致力于为数字游民提供可信的城市数据、共享办公信息与社区连接。</p>
        <ul className="list-disc list-inside space-y-1">
          <li>核心团队：远程工作与旅行产品背景</li>
          <li>使命：让全球任何地方都能高效工作</li>
          <li>联系：hi@gonomads.app</li>
        </ul>
      </div>
    ),
    privacy: (
      <div className="space-y-3 text-sm text-base-content/80">
        <p>我们只收集提供服务所需的最小数据，并采用加密存储与传输。</p>
        <ul className="list-disc list-inside space-y-1">
          <li>账号：用于登录与同步行程</li>
          <li>设备与日志：用于性能与安全审计</li>
          <li>删除与导出：可随时申请导出或删除数据</li>
          <li>第三方：仅在必要时与服务提供商共享，遵循最小化原则</li>
        </ul>
      </div>
    ),
    terms: (
      <div className="space-y-3 text-sm text-base-content/80">
        <p>使用本服务即表示同意遵守以下条款。</p>
        <ul className="list-disc list-inside space-y-1">
          <li>合理使用：不得用于违法或滥用场景</li>
          <li>内容来源：部分数据来自第三方，实际情况以当地为准</li>
          <li>责任限制：对因不可抗力或第三方因素导致的损失不承担连带责任</li>
          <li>条款更新：我们会在更新时提示，请定期查看</li>
        </ul>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      {/* Navigation */}
      <nav className="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-200">
        <div className="navbar-start">
          <a className="text-xl font-bold text-primary">行途</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li><a href="#features">功能</a></li>
            <li><a href="#screenshots">截图</a></li>
            <li><a href="#download">下载</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <a href="#download" className="btn btn-primary btn-sm">立即下载</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="hero relative min-h-[70vh] overflow-hidden"
        style={{
          backgroundImage: "url('/hero/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-base-100/20 via-base-100/40 to-base-100/70" />
        <div className="hero-content relative z-10 text-center py-20">
          <div className="max-w-3xl">
            <div className="badge badge-primary badge-lg mb-6">数字游民必备工具</div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              探索世界，<br />
              <span className="text-primary">随处工作</span>
            </h1>
            <p className="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
              行途是专为数字游民打造的一站式平台。发现全球最佳远程办公城市、
              精选共享空间、参与社区活动，让你的旅居生活更加精彩。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="button"
                className="btn btn-primary btn-lg gap-2"
                onClick={() => showToast("iOS 版本暂未上架，敬请期待！")}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </button>
              <button
                type="button"
                className="btn btn-outline btn-lg gap-2"
                onClick={() => setShowQR(true)}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                Google Play
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">为数字游民而生</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              从城市探索到社区连接，行途帮你解决旅居生活的方方面面
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ title, description, icon: Icon, image }) => (
              <div key={title} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body gap-4">
                  <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10">
                    <Image
                      src={image}
                      alt={`${title} 插图`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute left-4 top-4 w-10 h-10 rounded-2xl bg-base-100/90 backdrop-blur flex items-center justify-center shadow">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="card-title text-lg">{title}</h3>
                    <p className="text-base-content/70">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section id="screenshots" className="py-20 px-6 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">精美界面，优雅体验</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              简洁直观的设计，让每一次使用都是享受
            </p>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide">
            {screenshots.map(({ src, alt }, index) => (
              <div
                key={index}
                className="flex-shrink-0 snap-center"
              >
                <div className="mockup-phone border-primary">
                  <div className="camera"></div>
                  <div className="display">
                    <div className="artboard artboard-demo phone-1 relative">
                      <Image
                        src={src}
                        alt={alt}
                        width={300}
                        height={650}
                        className="object-cover rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-center mt-4 text-base-content/70">{alt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section id="download" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-2xl">
            <div className="card-body text-center py-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">开始你的数字游民之旅</h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                立即下载行途，加入全球数字游民社区，探索更多可能
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  className="btn btn-lg bg-white text-primary hover:bg-white/90 gap-2"
                  onClick={() => showToast("iOS 版本暂未上架，敬请期待！")}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  App Store
                </button>
                <button
                  type="button"
                  className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary gap-2"
                  onClick={() => setShowQR(true)}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <nav className="grid grid-flow-col gap-6">
          <button className="link link-hover" onClick={() => setModal("about")}>关于我们</button>
          <button className="link link-hover" onClick={() => setModal("privacy")}>隐私政策</button>
          <button className="link link-hover" onClick={() => setModal("terms")}>使用条款</button>
          <a className="link link-hover" href="mailto:hi@gonomads.app">联系我们</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a href="#" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="#" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </nav>
        <aside className="space-y-2 text-sm text-base-content/80">
          <p>© 2026 行途. All rights reserved.</p>
          <a
            className="link link-hover"
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            辽ICP备2026001591号
          </a>
        </aside>
      </footer>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-xl rounded-2xl bg-base-100 p-6 shadow-2xl">
            <button
              aria-label="关闭"
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
              onClick={() => setModal(null)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">{modalTitle[modal]}</h3>
            {modalBody[modal]}
            <div className="mt-6 text-right">
              <button className="btn btn-primary btn-sm" onClick={() => setModal(null)}>
                知道了
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal for Android */}
      {showQR && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowQR(false)}
        >
          <div
            className="relative w-full max-w-xs rounded-2xl bg-base-100 p-6 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="关闭"
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
              onClick={() => setShowQR(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">扫码下载 Android 版</h3>
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(ANDROID_DOWNLOAD_URL)}`}
                alt="Android 下载二维码"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            <p className="mt-4 text-sm text-base-content/70">使用手机相机或浏览器扫描二维码</p>
            <a
              href={ANDROID_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm mt-4"
            >
              直接访问下载页
            </a>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="toast toast-top toast-center z-[60]">
          <div className="alert alert-info">
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
