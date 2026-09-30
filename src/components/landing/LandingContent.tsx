"use client";

import Link from "next/link";
import CharSelector from "@/components/shared/CharSelector";
import FeatureSwiper from "@/components/shared/FeatureSwiper";
import { NavPage, SideMenu } from "@/components/shared/SideNav";
import SiteShell from "@/components/shared/SiteShell";
import { useSite } from "@/components/shared/SiteContext";

const NAV_ITEMS = [
  { target: "page1", title: "Trang Landing", text: "Trang Landing" },
  { target: "page2", title: "Môn phái", text: "Môn Phái" },
  { target: "page3", title: "Tin Tức", text: "Tin Tức" },
  { target: "page4", title: "Tính Năng", text: "Tính Năng" },
];

// Views/Landing/Index.cshtml (teaser page with its own layout + CSS + images).
export default function LandingContent() {
  return (
    <SiteShell
      variant="landing"
      afterWrapper={
        <>
          <SideMenu variant="landing" />
          <NavPage items={NAV_ITEMS} />
        </>
      }
    >
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
    </SiteShell>
  );
}

function Page1() {
  const { config, img } = useSite();
  return (
    <section id="page1" className="page page1">
      <img src={`${img}/bg-page1.webp`} alt="" className="background showOnPc" />
      <img src={`${img}/bg-page1-mb.webp`} alt="" className="background showOnMobile" />
      <div className="page-inner">
        <div className="layer top-layer">
          <h1 className="logo-game">
            <Link href="/" title="Hắc Ngộ Không">
              <img src={`${img}/logo-game.webp`} alt="Giang Hồ Kỳ Ngộ" className="imgFull" />
            </Link>
          </h1>
          <div className="age-rating">
            <img src={`${img}/logo-18.webp`} alt="18+" className="age-rating-img imgFull showOnPc" />
            <img src={`${img}/logo-18-mb.webp`} alt="18+" className="age-rating-img imgFull showOnMobile" />
          </div>
          <div className="logo-vplay">
            <img src={`${img}/logo-vplay.webp`} alt="Vplay" className="logo-vplay-img imgFull" />
          </div>
          <div className="buttons-socials">
            <a href="/" className="btn btn-homepage" target="_blank">
              <img src={`${img}/icon-home2.webp`} alt="Home page" className="btn-homepage-img imgFull" />
            </a>
            <a href={config?.page_payment_url || "#"} className="btn btn-charge" target="_blank">
              <img src={`${img}/icon-charge.webp`} alt="Charge" className="btn-charge-img imgFull" />
            </a>
            <a href={config?.fb_page_link || "#"} className="btn btn-fanpage" target="_blank">
              <img src={`${img}/icon-facebook.webp`} alt="Fanpage" className="btn-fanpage-img imgFull" />
            </a>
            <a href={config?.tiktok_link || "#"} className="btn btn-tiktok" target="_blank">
              <img src={`${img}/icon-tiktok.webp`} alt="Community" className="btn-tiktok-img imgFull" />
            </a>
            <a href={config?.fb_group_link || "#"} className="btn btn-community" target="_blank">
              <img src={`${img}/icon-group2.webp`} alt="Community" className="btn-community-img imgFull" />
            </a>
          </div>
          <div className="text-p1">
            <img src={`${img}/text-page1.webp`} alt="Hữu duyên gặp gỡ - Xưng bá võ lâm" className="imgFull" />
          </div>
          <div className="buttons-store">
            <a href={config?.link_h5 || "#"} className="btn btn-playnow" target="_blank">
              <img src={`${img}/btn-playnow.webp`} alt="Play now" className="flash btn-playnow-img imgFull" />
            </a>
            <a href={config?.download_ios_link || "#"} className="btn btn-appstore" target="_blank">
              <img src={`${img}/btn-appstore.webp`} alt="Appstore" className="btn-appstore-img imgFull" />
            </a>
            <a href={config?.download_android_link || "#"} className="btn btn-playstore" target="_blank">
              <img src={`${img}/btn-playstore.webp`} alt="Playstore" className="btn-playstore-img imgFull" />
            </a>
            <a href={config?.download_apk_link || "#"} className="btn btn-apk" target="_blank">
              <img src={`${img}/btn-apk.webp`} alt="File APK" className="btn-apk-img imgFull" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Page2() {
  const { img } = useSite();
  return (
    <section id="page2" className="page page2">
      <img src={`${img}/bg-page2.webp`} alt="" className="background showOnPc" />
      <img src={`${img}/bg-page2-mb.webp`} alt="" className="background showOnMobile" />
      <div className="page-inner">
        <h2 className="title">
          <img src={`${img}/title-page2.webp`} alt="Giang hồ danh tướng" className="imgFull" />
        </h2>
        <CharSelector prefix="page2" artClass="page2-main-img" />
      </div>
    </section>
  );
}

function Page3() {
  const { config, img } = useSite();
  const items = [
    { art: "art-like", icon: "icon-like", btn: "btn-like", alt: "Like Page", href: config?.fb_page_link },
    { art: "art-joingroup", icon: "icon-joingroup", btn: "btn-joingroup", alt: "Join Group", href: config?.fb_group_link },
    { art: "art-voteapp", icon: "icon-voteapp", btn: "btn-voteapp", alt: "Vote App", href: config?.link_vote_app },
    { art: "art-share", icon: "icon-share", btn: "btn-share", alt: "Loan tin", href: config?.link_loan_tin },
  ];
  return (
    <section id="page3" className="page page3">
      <img src={`${img}/bg-page3.webp`} alt="" className="background showOnPc" />
      <img src={`${img}/bg-page3-mb.webp`} alt="" className="background showOnMobile" />
      <div className="page-inner">
        <h2 className="title">
          <img src={`${img}/title-page3.webp`} alt="Giang hồ tin tức" className="imgFull" />
        </h2>
        <div className="btn-group">
          {items.map((it) => (
            <div className="page3-item" key={it.art}>
              <div className="page3-item-bg">
                <img src={`${img}/${it.art}.webp`} alt={it.alt} className="imgFull" />
              </div>
              <div className="page3-item-icon pa">
                <img src={`${img}/${it.icon}.webp`} alt={it.alt} className="imgFull" />
              </div>
              <a href={it.href || "#"} className="page3-item-btn pa" target="_blank">
                <img src={`${img}/${it.btn}.webp`} alt={it.alt} className="imgFull" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Page4() {
  const { config, img } = useSite();
  return (
    <section id="page4" className="page page4">
      <img src={`${img}/bg-page4.webp`} alt="" className="background showOnPc" />
      <img src={`${img}/bg-page4-mb.webp`} alt="" className="background showOnMobile" />
      <div className="page-inner">
        <h2 className="title">
          <img src={`${img}/title-page4.webp`} alt="Giang hồ đặc sắc" className="imgFull" />
        </h2>
        <FeatureSwiper />
        <div className="buttons-socials">
          <a href={config?.fb_page_link || "#"} className="btn btn-fanpage" target="_blank">
            <img src={`${img}/btn-fanpage2.webp`} alt="Fanpage" className="btn-fanpage-img imgFull" />
          </a>
          <a href={config?.fb_group_link || "#"} className="btn btn-group" target="_blank">
            <img src={`${img}/btn-group2.webp`} alt="Group" className="btn-group-img imgFull" />
          </a>
          <a href={config?.web_domain || "#"} className="btn btn-homepage" target="_blank">
            <img src={`${img}/btn-home2.webp`} alt="Home page" className="btn-homepage-img imgFull" />
          </a>
          <a href={config?.tiktok_link || "#"} className="btn btn-tiktok" target="_blank">
            <img src={`${img}/btn-tiktok2.webp`} alt="Tiktok" className="btn-tiktok-img imgFull" />
          </a>
        </div>
      </div>
    </section>
  );
}
