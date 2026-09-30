import NewsDetail from "@/components/news/NewsDetail";

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return <NewsDetail slug={decodeURIComponent(params.slug)} />;
}
