"use client";

import { useState } from "react";
import { useSite, type Variant } from "./SiteContext";

// The `AfterWrapper` section of Home/Index.cshtml and Landing/Index.cshtml:
// fixed right-hand menu (side-menu) + dotted page navigator (nav-page).
export function SideMenu({ variant }: { variant: Variant }) {
  const { config, img } = useSite();
  const landing = variant === "landing";
  return (
    <div className={`side-menu${landing ? "" : " showOnPc"}`}>
      <div className="menu-container">
        <a href={config?.web_domain || "#"} className="menu-item icon-app" title="Icon Game">
          <img src={`${img}/icon-app.webp`} alt="Icon Game" className="imgFull" />
        </a>
        <a href={(landing ? config?.download_android_link : config?.link_h5) || "#"} className="btn-playnow">
          <img src={`${img}/btn-playnow2.webp`} alt="Chơi ngay" className="imgFull flash" />
        </a>
        <div className="btn-group">
          <a href={config?.page_payment_url || "#"} className="menu-item btn-charge" title="Nạp thẻ">
            <img src={`${img}/btn-charge.webp`} alt="Nạp thẻ" className="imgFull" />
          </a>
          <a href={config?.download_ios_link || "#"} className="menu-item btn-download" title="Apple Store">
            <img src={`${img}/btn-appstore2.webp`} alt="Apple Store" className="imgFull" />
          </a>
          <a href={config?.download_android_link || "#"} className="menu-item btn-download" title="Google Play">
            <img src={`${img}/btn-playstore2.webp`} alt="Google Play" className="imgFull" />
          </a>
          <a href={config?.download_apk_link || "#"} className="menu-item btn-download" title="File APK">
            <img src={`${img}/btn-apk2.webp`} alt="File APK" className="imgFull" />
          </a>
        </div>

        <div className="link-group">
          <a href={config?.fb_page_link || "#"} title="Fanpage">
            Fanpage
          </a>
          <a href={config?.fb_group_link || "#"} title="Group">
            Group
          </a>
        </div>

        <div className="menu-item qrcode" title="Qrcode">
          <img src={config?.qrcode_img_link || `${img}/img-qrcode.webp`} alt="Qrcode" className="imgFull" />
        </div>
      </div>
    </div>
  );
}

export interface NavEntry {
  target: string;
  title: string;
  text: string;
}

// index.js: clicking a nav item just moves the `active` class (the anchor
// does the scrolling).
export function NavPage({ items }: { items: NavEntry[] }) {
  const [active, setActive] = useState(items[0].target);
  return (
    <nav className="nav-page showOnPc">
      <ul>
        {items.map((it, i) => (
          <li
            key={it.target}
            className={`nav-item nav-item${i + 1}${active === it.target ? " active" : ""}`}
            data-target={it.target}
            onClick={() => setActive(it.target)}
          >
            <a href={`#${it.target}`} title={it.title}>
              <span className="dot"></span>
              <span className="text">{it.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
