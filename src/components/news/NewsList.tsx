"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { getCategories, getPostsByCategory } from "@/services";
import type { NewsCategory, NewsPost } from "@/utils/types";
import SiteShell from "@/components/shared/SiteShell";

const PAGE_SIZE = 8;

// Views/News/Index.cshtml + NewsController.Index: tab = category slug
// (route /danh-muc/{tab?}), ?page=n paginates 8 posts per page.
export default function NewsList() {
  return (
    <SiteShell variant="site" topBanner>
      <Suspense fallback={null}>
        <NewsListInner />
      </Suspense>
    </SiteShell>
  );
}

function NewsListInner() {
  const params = useParams<{ tab?: string[] }>();
  const search = useSearchParams();
  const tab = params?.tab?.[0] ? decodeURIComponent(params.tab[0]) : undefined;
  const pageParam = parseInt(search.get("page") ?? "1", 10);

  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Categories are only fetched once; posts are refetched when the tab changes.
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const activeSlug = categories.some((c) => c.slug === tab) ? tab! : categories[0]?.slug ?? "";
  const activeCategory = categories.find((c) => c.slug === activeSlug);
  const activeId = activeCategory?.id;

  useEffect(() => {
    if (activeId === undefined) return;
    let alive = true;
    setLoaded(false);
    getPostsByCategory(activeId, 10000).then((p) => {
      if (!alive) return;
      setPosts(p);
      setLoaded(true);
    });
    return () => {
      alive = false;
    };
  }, [activeId]);

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const page = Math.min(Math.max(Number.isNaN(pageParam) ? 1 : pageParam, 1), totalPages);
  const pagePosts = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const href = (p: number) => `/danh-muc/${activeSlug}?page=${p}`;

  return (
    <section className="page page2-news">
      <img src="/legacy/img/bg-page2-news.webp" alt="" className="background showOnPc" />
      <img src="/legacy/img/bg-page2-news-mb.webp" alt="" className="background showOnMobile" />
      <div className="page-inner">
        <div className="news-wrap">
          <div className="news-title">
            <span>Tin tức - Sự kiện</span>
          </div>
          <div className="news-content-main">
            <div className="news-tabs-nav">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/danh-muc/${c.slug}`}
                  className={`news-tab-item${c.slug === activeSlug ? " active" : ""}`}
                >
                  {c.title}
                </Link>
              ))}
            </div>
            <div className="news-list-scroll">
              <div className="news-pane active">
                <ul className="news-items-ul">
                  {pagePosts.map((post) => (
                    <li className="news-li" key={post.id}>
                      <Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                      <span className="news-time">{post.published_at}</span>
                    </li>
                  ))}
                  {loaded && pagePosts.length === 0 && <li className="news-li">Chưa có bài viết nào trong mục này.</li>}
                </ul>
              </div>
            </div>
            {totalPages > 1 && (
              <div className="news-pagination-wrap">
                <Link href={href(1)} className="news-page-btn">
                  Đầu Trang
                </Link>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link key={p} href={href(p)} className={`news-page-btn${p === page ? " active" : ""}`}>
                    {p}
                  </Link>
                ))}
                <Link href={href(totalPages)} className="news-page-btn">
                  Trang Cuối
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
