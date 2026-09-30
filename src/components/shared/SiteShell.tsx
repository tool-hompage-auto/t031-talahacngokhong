"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { SiteContext, imgBase, useSite, type Variant } from "./SiteContext";

// Ports Views/Shared/_Layout.cshtml + _LandingLayout.cshtml body:
//   .wrapper > _HeaderMobile, _MenuMobile, [_TopBanner], page, _Footer
// with the page's `AfterWrapper` section rendered after the wrapper.
// The original is ONE responsive markup tree (showOnPc / showOnMobile are
// toggled by @media in the CSS), so there is no device split here.
export default function SiteShell({
  variant,
  topBanner = false,
  afterWrapper,
  children,
}: {
  variant: Variant;
  topBanner?: boolean;
  afterWrapper?: React.ReactNode;
  children: React.ReactNode;
}) {
  const config = useSiteConfig();
  const img = imgBase(variant);
  const [menuOpen, setMenuOpen] = useState(false);

  // index.js: animate .text-p1 while #page1 is (>= 10%) in view.
  useEffect(() => {
    const page1 = document.querySelector("#page1");
    if (!page1) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          document.querySelectorAll(".text-p1").forEach((el) => el.classList.toggle("animate", entry.isIntersecting));
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(page1);
    return () => observer.disconnect();
  }, []);

  return (
    <SiteContext.Provider value={{ config, img }}>
      <div className="wrapper">
        <div className="header-mobile showOnMobile">
          <div className="header-mobile-inner">
            <div className="h-m-left">
              <Link href="/landing">
                <img src={`${img}/icon-app.webp`} alt="Hắc Ngộ Không" className="h-m-logo" />
              </Link>
              <div className="h-m-title">
                <span>Ta Là Hắc Ngộ Không</span>
                <span>Alpha test 15/6 - Open Beta 30/6</span>
              </div>
            </div>
            <div className="h-m-right">
              <a href={config?.download_android_link || "#"} className="h-m-download">
                <img src={`${img}/btn-download.webp`} alt="Tải Game Hắc Ngộ Không" />
              </a>
              <button className="h-m-menu btn-menu" onClick={() => setMenuOpen(true)}>
                <img src={`${img}/btn-menu.png`} alt="Nút Menu" />
              </button>
            </div>
          </div>
        </div>

        <div className={`menu-mobile showOnMobile${menuOpen ? " active" : ""}`}>
          <div className="menu-m-overlay" onClick={() => setMenuOpen(false)}></div>
          <div className="menu-m-content">
            <button className="menu-m-close" onClick={() => setMenuOpen(false)}>
              &times;
            </button>
            <div className="menu-m-logo">
              <img src={`${img}/icon-app-mb.webp`} alt="Logo" />
            </div>
            <ul className="menu-m-list" onClick={(e) => (e.target as HTMLElement).closest("a") && setMenuOpen(false)}>
              <li>
                <Link href="/">
                  <i className="icon-home"></i> Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/danh-muc">
                  <i className="icon-news"></i> Tin Tức
                </Link>
              </li>
              <li>
                <a href={config?.fb_page_link || "#"}>
                  <i className="icon-fanpage"></i> Fanpage
                </a>
              </li>
              <li>
                <a href={config?.fb_group_link || "#"}>
                  <i className="icon-community"></i> Cộng đồng
                </a>
              </li>
              <li>
                <a href={config?.page_payment_url || "#"}>
                  <i className="icon-charge"></i> Nạp
                </a>
              </li>
              <li>
                <a href={config?.page_support_url || "#"}>
                  <i className="icon-cskh"></i> CSKH
                </a>
              </li>
            </ul>
          </div>
        </div>

        {topBanner && <TopBanner />}
        {children}

        {/* Views/Shared/_Footer.cshtml: only the game G1 license is kept (see original TODO). */}
        <div
          data-vplay-widget="footer"
          data-locale="vi"
          data-license-number={
            "Giấy phép cung cấp dịch vụ trò chơi điện tử G1 trên mạng số 131/GP-PTTH&TTĐT do Cục Phát thanh, truyền hình và thông tin điện từ cấp sửa đổi bổ sung lần 03 ngày 13 tháng 8 năm 2025"
          }
          data-license-link=""
          data-platform="landingGame"
        ></div>
        <Script src="https://website-assets-cdn.vtvlive.vn/dev-sdk-web-vplay/loader.min.js" strategy="lazyOnload" />
      </div>
      {afterWrapper}
    </SiteContext.Provider>
  );
}

// Views/Shared/_TopBanner.cshtml (section#page1 for Home/News pages).
function TopBanner() {
  const { config } = useSite();
  return (
    <section id="page1" className="page page1">
      <img src="/legacy/img/bg-page1.webp" alt="" className="background showOnPc" />
      <img src="/legacy/img/bg-page1-mb.webp" alt="" className="background showOnMobile" />
      <div className="page-inner">
        <div className="layer top-layer">
          <h1 className="logo-game">
            <Link href="/" title="Hắc Ngộ Không">
              <img src="/legacy/img/logo-game.webp" alt="Giang Hồ Kỳ Ngộ" className="imgFull" />
            </Link>
          </h1>
          <div className="age-rating">
            <img src="/legacy/img/logo-18.webp" alt="18+" className="age-rating-img imgFull showOnPc" />
            <img src="/legacy/img/logo-18-mb.webp" alt="18+" className="age-rating-img imgFull showOnMobile" />
          </div>
          <div className="logo-vplay">
            <img src="/legacy/img/logo-vplay.webp" alt="Vplay" className="logo-vplay-img imgFull" />
          </div>
          <div className="buttons-socials">
            <a href={config?.web_domain || "#"} className="btn btn-homepage" target="_blank">
              <img src="/legacy/img/icon-home2.webp" alt="Home page" className="btn-homepage-img imgFull" />
            </a>
            <a href={config?.page_payment_url || "#"} className="btn btn-charge" target="_blank">
              <img src="/legacy/img/icon-charge.webp" alt="Charge" className="btn-charge-img imgFull" />
            </a>
            <a href={config?.fb_page_link || "#"} className="btn btn-fanpage" target="_blank">
              <img src="/legacy/img/icon-facebook.webp" alt="Fanpage" className="btn-fanpage-img imgFull" />
            </a>
            <a href={config?.tiktok_link || "#"} className="btn btn-tiktok" target="_blank">
              <img src="/legacy/img/icon-tiktok.webp" alt="Community" className="btn-tiktok-img imgFull" />
            </a>
            <a href={config?.fb_group_link || "#"} className="btn btn-community" target="_blank">
              <img src="/legacy/img/icon-group2.webp" alt="Community" className="btn-community-img imgFull" />
            </a>
          </div>
          <div className="text-p1">
            <img src="/legacy/img/text-page1.webp" alt="Hữu duyên gặp gỡ - Xưng bá võ lâm" className="imgFull" />
          </div>
        </div>
      </div>
    </section>
  );
}
