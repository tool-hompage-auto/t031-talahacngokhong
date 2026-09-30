import type { Metadata, Viewport } from "next";
import { getSiteConfig } from "@/services";

const DEFAULT_TITLE = "HẮC NGỘ KHÔNG - Siêu Phẩm Game Tiên Hiệp Đỉnh Cao 2026 | VPlay";
const DEFAULT_DESC =
  "Hắc Ngộ Không - Tựa game tiên hiệp hành động đỉnh cao 2026. Hóa thân thành Tề Thiên Đại Thánh phiên bản hắc ám, xưng bá tam giới, chinh phục giang hồ. Tải ngay - Trải nghiệm miễn phí!";
const ORIGIN = "https://hacngokhong.vplay.vn";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// Mirrors the <head> of _Layout.cshtml / _LandingLayout.cshtml (config values
// win over the hardcoded fallbacks, share_* fall back to the page title/desc).
export async function buildMetadata(path: string): Promise<Metadata> {
  const config = await getSiteConfig();
  const title = config?.home_meta_title || DEFAULT_TITLE;
  const description = config?.home_meta_desc || DEFAULT_DESC;
  const shareTitle = config?.share_title || title;
  const shareDesc = config?.share_desc || description;
  const shareImage = config?.share_thumb || undefined; // original fallback img/share-fb.webp does not exist in wwwroot
  const url = `${ORIGIN}${path}`;
  return {
    title,
    description,
    keywords: config?.home_meta_keywords || undefined,
    referrer: "no-referrer-when-downgrade",
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: shareTitle,
      description: shareDesc,
      images: shareImage ? [shareImage] : undefined,
      locale: "vi_VN",
      siteName: config?.site_name || "VPlay",
    },
    twitter: { card: "summary_large_image", title: shareTitle, description: shareDesc, images: shareImage ? [shareImage] : undefined },
  };
}
