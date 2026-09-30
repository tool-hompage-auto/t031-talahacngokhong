"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostsByCategory } from "@/services";
import type { NewsPost } from "@/utils/types";
import SiteShell from "@/components/shared/SiteShell";

const RELATED_LIMIT = 4;
const RELATED_SHOWN = 3;

// Views/News/Detail.cshtml + NewsController.Detail.
export default function NewsDetail({ slug }: { slug: string }) {
  return (
    <SiteShell variant="site" topBanner>
      <DetailInner slug={slug} />
    </SiteShell>
  );
}

function DetailInner({ slug }: { slug: string }) {
  const [post, setPost] = useState<NewsPost | null>(null);
  const [others, setOthers] = useState<NewsPost[]>([]);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let alive = true;
    setPost(null);
    setMissing(false);
    getPostBySlug(slug).then(async (p) => {
      if (!alive) return;
      if (!p) {
        setMissing(true);
        return;
      }
      const related = await getPostsByCategory(p.category_id, RELATED_LIMIT);
      if (!alive) return;
      setOthers(related.filter((r) => r.id !== p.id).slice(0, RELATED_SHOWN));
      setPost(p);
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (missing) notFound();

  const categoryHref = `/danh-muc/${post?.category?.slug ?? ""}`;

  return (
    <section className="page page2-news">
      <img src="/legacy/img/bg-page2-news.webp" alt="" className="background showOnPc" />
      <img src="/legacy/img/bg-page2-news-mb.webp" alt="" className="background showOnMobile" />
      <div className="page-inner">
        <div className="news-wrap">
          <div className="news-title">
            <span>Tin tức</span>
          </div>
          {post && (
            <div className="news-detail-main">
              <div className="news-detail-header">
                <div className="breadcum">
                  <Link href="/">
                    <img src="/legacy/img/icon-home2.png" alt="" />
                  </Link>
                  <span>&gt;</span>
                  <Link href={categoryHref}>TIN TỨC</Link>
                  <span>&gt;</span>
                  <span>{post.title}</span>
                </div>
              </div>
              <h2 className="news-detail-title">{post.title}</h2>
              <div className="news-detail-content" dangerouslySetInnerHTML={{ __html: post.content ?? "" }} />
              {others.length > 0 && (
                <div className="news-detail-others">
                  <h3 className="others-title">Tin Khác</h3>
                  <ul className="others-list">
                    {others.map((item) => (
                      <li key={item.id}>
                        <Link href={`/tin-tuc/${item.slug}`}>{item.title}</Link>
                        <span>{item.published_at}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="btn-more-others">
                    <Link href={categoryHref}>Xem Thêm &gt;</Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
