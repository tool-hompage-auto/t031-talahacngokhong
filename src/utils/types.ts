export interface SiteConfig {
  site_name?: string;
  home_meta_title?: string;
  home_meta_desc?: string;
  home_meta_keywords?: string;
  share_title?: string;
  share_desc?: string;
  share_thumb?: string;
  fb_page_link?: string;
  fb_group_link?: string;
  tiktok_link?: string;
  web_domain?: string;
  page_support_url?: string;
  page_event_url?: string;
  page_payment_url?: string;
  page_giftcode_url?: string;
  download_ios_link?: string;
  download_android_link?: string;
  download_apk_link?: string;
  download_pc_link?: string;
  qrcode_img_link?: string;
  link_h5?: string;
  link_vote_app?: string;
  link_loan_tin?: string;
  link_like_page?: string;
}

export interface NewsCategory {
  id: number;
  slug: string;
  title: string;
}

export interface NewsPost {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  desc?: string;
  image?: string;
  status?: number;
  published_at?: string;
  created_at?: string;
  category?: NewsCategory | null;
  content?: string;
}

export interface SlideItem {
  image: string;
  link?: string | null;
  title?: string | null;
}

export interface RankingRow {
  id: number;
  name: string;
  server: string;
  power: number;
}
