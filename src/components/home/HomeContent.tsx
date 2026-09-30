"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories, getPostsByCategory, getRanking, getSlides } from "@/services";
import type { NewsCategory, NewsPost, RankingRow, SlideItem } from "@/utils/types";
import CharSelector from "@/components/shared/CharSelector";
import FeatureSwiper from "@/components/shared/FeatureSwiper";
import { NavPage, SideMenu } from "@/components/shared/SideNav";
import SiteShell from "@/components/shared/SiteShell";
import { useSite } from "@/components/shared/SiteContext";
import OwlSlider from "./OwlSlider";

const HOME_PREVIEW_POSTS = 4;

// Placeholder tabs (HomeController.BuildPlaceholderLeaderboard) - the original
// still has no API mode/scope for Bang Hoi / TOP Cum.
function placeholderRows(name: string, server: string, power: string) {
  return Array.from({ length: 10 }, (_, i) => ({ rank: i + 1, name, server, power }));
}
const BANG_HOI = placeholderRows("BangHoiXXX", "Server xxx", "9,999,999,999,999");
const TOP_CUM = placeholderRows("xxxxxxxx", "Cụm xxx", "1,201,546,211,234");

const NAV_ITEMS = [
  { target: "page1", title: "Trang Landing", text: "Trang chủ" },
  { target: "page2", title: "Tin Tức", text: "Tin Tức" },
  { target: "page3", title: "Môn phái", text: "Môn Phái" },
  { target: "page4", title: "Tính Năng", text: "Tính Năng" },
  { target: "page5", title: "Bảng Xếp Hạng", text: "Bảng Xếp Hạng" },
];

export default function HomeContent() {
  return (
    <SiteShell
      variant="site"
      topBanner
      afterWrapper={
        <>
          <SideMenu variant="site" />
          <NavPage items={NAV_ITEMS} />
        </>
      }
    >
      <NewsSection />
      <CharSection />
      <FeatureSection />
      <RankingSection />
    </SiteShell>
  );
}

function NewsSection() {
  const { config } = useSite();
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [postsByCat, setPostsByCat] = useState<Record<number, NewsPost[]>>({});
  const [slides, setSlides] = useState<SlideItem[] | null>(null);
  const [activeSlug, setActiveSlug] = useState("");

  useEffect(() => {
    let alive = true;
    getSlides().then((s) => alive && setSlides(s));
    getCategories().then(async (cats) => {
      const results = await Promise.all(cats.map((c) => getPostsByCategory(c.id, HOME_PREVIEW_POSTS)));
      if (!alive) return;
      const map: Record<number, NewsPost[]> = {};
      cats.forEach((c, i) => (map[c.id] = results[i]));
      setPostsByCat(map);
      setCategories(cats);
      setActiveSlug(cats[0]?.slug ?? "");
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section id="page2" className="page page2">
      <img src="/legacy/img/bg-page2.webp" alt="" className="background showOnPc" />
      <img src="/legacy/img/bg-page2-mb.webp" alt="" className="background showOnMobile" />
      <div className="page-inner">
        <div className="block block1">
          <a href={config?.link_h5 || "#"} className="btn-playnow">
            <img src="/legacy/img/btn-playnow.png" alt="Tải game" className="btn-playnow-img imgFull flash" />
          </a>
          <a href={config?.web_domain || "#"} className="icon-app">
            <img src="/legacy/img/icon-app.webp" alt="Icon Game" className="icon-app-img imgFull" />
          </a>
          <div className="button-store">
            <a href={config?.download_ios_link || "#"} className="btn btn-appstore" target="_blank">
              <img src="/legacy/img/btn-appstore.webp" alt="Appstore" className="btn-appstore-img imgFull" />
            </a>
            <a href={config?.download_android_link || "#"} className="btn btn-playstore" target="_blank">
              <img src="/legacy/img/btn-playstore.webp" alt="Playstore" className="btn-playstore-img imgFull" />
            </a>
          </div>
          <a href={config?.download_apk_link || "#"} className="btn btn-apk" target="_blank">
            <img src="/legacy/img/btn-apk.png" alt="File APK" className="btn-apk-img imgFull" />
          </a>
        </div>
        <div className="block block2">
          <OwlSlider slides={slides} fallback="/legacy/img/img-slide.png" />
          <div className="news-block">
            <div className="news-block-inner">
              <div className="news-block-header">
                <ul className="news-menu">
                  {categories.map((c) => (
                    <li key={c.id}>
                      <button
                        className={`menu-item${c.slug === activeSlug ? " active" : ""}`}
                        data-target={`news-${c.slug}`}
                        onClick={() => setActiveSlug(c.slug)}
                      >
                        {c.title}
                      </button>
                    </li>
                  ))}
                </ul>
                <Link href="/danh-muc" className="btn-plus" title="Xem tổng hợp">
                  +
                </Link>
              </div>
              <div className="news-block-content">
                {categories.map((c) => (
                  <div className={`news-pane${c.slug === activeSlug ? " active" : ""}`} id={`news-${c.slug}`} key={c.id}>
                    <ul className="news-list">
                      {(postsByCat[c.id] ?? []).map((post) => (
                        <li className="news-item" key={post.id}>
                          <Link href={`/tin-tuc/${post.slug}`} className="news-link">
                            {post.title}
                          </Link>
                          <span className="news-date">{post.published_at}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/danh-muc/${c.slug}`} className="btn-more">
                      Xem thêm
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="block block3">
          <a href={config?.page_payment_url || "#"} className="btn btn-napthe" target="_blank">
            <img src="/legacy/img/btn-naptien.png" alt="Nạp thẻ" className="btn-appstore-img imgFull" />
          </a>
          <a href={config?.page_giftcode_url || "#"} className="btn btn-giftcode" target="_blank">
            <img src="/legacy/img/btn-giftcode.png" alt="Giftcode" className="btn-playstore-img imgFull" />
          </a>
          <a href={config?.fb_page_link || "#"} className="btn btn-fanpage" target="_blank">
            <img src="/legacy/img/btn-fanpage.png" alt="Fanpage" className="btn-apk-img imgFull" />
          </a>
          <a href={config?.page_support_url || "#"} className="btn btn-cskh" target="_blank">
            <img src="/legacy/img/btn-cskh.png" alt="CSKH" className="btn-apk-img imgFull" />
          </a>
        </div>
      </div>
    </section>
  );
}

function CharSection() {
  return (
    <section id="page3" className="page page3">
      <img src="/legacy/img/bg-page3.webp" alt="" className="background showOnPc" />
      <img src="/legacy/img/bg-page3-mb.webp" alt="" className="background showOnMobile" />
      <div className="page-inner">
        <h2 className="title">
          <img src="/legacy/img/title-page3.webp" alt="Môn phái" className="imgFull" />
        </h2>
        <CharSelector prefix="page3" artClass="page3-art-img" />
      </div>
    </section>
  );
}

function FeatureSection() {
  return (
    <section id="page4" className="page page4">
      <img src="/legacy/img/bg-page4.webp" alt="" className="background showOnPc" />
      <img src="/legacy/img/bg-page4-mb.webp" alt="" className="background showOnMobile" />
      <div className="page-inner">
        <h2 className="title">
          <img src="/legacy/img/title-page4.webp" alt="Giang hồ đặc sắc" className="imgFull" />
        </h2>
        <FeatureSwiper />
      </div>
    </section>
  );
}

type BxhTab = "bxh-server" | "bxh-banghoi" | "bxh-topcum";

function RankingSection() {
  const { config } = useSite();
  const [tab, setTab] = useState<BxhTab>("bxh-server");
  const [server, setServer] = useState<RankingRow[]>([]);

  useEffect(() => {
    let alive = true;
    getRanking("user", "all").then((r) => alive && setServer(r));
    return () => {
      alive = false;
    };
  }, []);

  const serverRows = server;
  const rankCell = (rank: number) => (rank <= 3 ? <img src={`/legacy/img/top-${rank}.png`} alt={`Top ${rank}`} /> : rank);

  const placeholderPane = (id: BxhTab, nameHeader: string, rows: typeof BANG_HOI) => (
    <div className={`bxh-pane${tab === id ? " active" : ""}`} id={id}>
      <div className="bxh-header">
        <div className="col col-1">Hạng</div>
        <div className="col col-2">{nameHeader}</div>
        <div className="col col-3">Server</div>
        <div className="col col-4">Lực chiến</div>
      </div>
      <div className="bxh-list">
        {rows.map((row) => (
          <div className="bxh-row" key={row.rank}>
            <div className="col col-1">{rankCell(row.rank)}</div>
            <div className="col col-2">{row.name}</div>
            <div className="col col-3">{row.server}</div>
            <div className="col col-4">{row.power}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="page5" className="page page5">
      <img src="/legacy/img/bg-page5.webp" alt="" className="background showOnPc" />
      <img src="/legacy/img/bg-page5-mb.webp" alt="" className="background showOnMobile" />
      <div className="page-inner">
        <h2 className="title">
          <img src="/legacy/img/title-page5.png" alt="Giang hồ đặc sắc" className="imgFull" />
        </h2>
        <div className="bxh">
          <div className="bxh-top">
            <button className={`bxh-btn${tab === "bxh-server" ? " active" : ""}`} onClick={() => setTab("bxh-server")}>
              BXH Server
            </button>
            <button className={`bxh-btn${tab === "bxh-banghoi" ? " active" : ""}`} onClick={() => setTab("bxh-banghoi")}>
              BXH Bang Hội
            </button>
            <button className={`bxh-btn${tab === "bxh-topcum" ? " active" : ""}`} onClick={() => setTab("bxh-topcum")}>
              BXH TOP Cụm
            </button>
          </div>
          <div className="bxh-content">
            <div className={`bxh-pane${tab === "bxh-server" ? " active" : ""}`} id="bxh-server">
              <div className="bxh-header">
                <div className="col col-1">Hạng</div>
                <div className="col col-2">Tên nhân vật</div>
                <div className="col col-3">Server</div>
                <div className="col col-4">Lực chiến</div>
              </div>
              <div className="bxh-list">
                {serverRows.length > 0 ? (
                  serverRows.map((row, i) => (
                    <div className="bxh-row" key={`${row.id}-${i}`}>
                      <div className="col col-1">{rankCell(i + 1)}</div>
                      <div className="col col-2">{row.name}</div>
                      <div className="col col-3">{row.server}</div>
                      <div className="col col-4">{Number(row.power).toLocaleString("en-US")}</div>
                    </div>
                  ))
                ) : (
                  <div className="bxh-row">
                    <div className="col col-2">Dữ liệu đang được cập nhật...</div>
                  </div>
                )}
              </div>
            </div>
            {placeholderPane("bxh-banghoi", "Tên bang hội", BANG_HOI)}
            {placeholderPane("bxh-topcum", "Tên nhân vật", TOP_CUM)}
          </div>
        </div>
      </div>
      <div className="p5-bottom-nav showOnPc">
        <div className="p5-nav-inner">
          <a href="#" className="p5-nav-item active">
            Trang chủ
          </a>
          <a href={config?.fb_page_link || "#"} className="p5-nav-item">
            Official Fanpage Facebook
          </a>
          <a href={config?.fb_group_link || "#"} className="p5-nav-item">
            Cộng đồng
          </a>
          <a href={config?.page_event_url || "#"} className="p5-nav-item">
            Sự kiện
          </a>
          <a href={config?.page_support_url || "#"} className="p5-nav-item">
            Hỗ trợ
          </a>
        </div>
      </div>
    </section>
  );
}
