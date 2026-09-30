import { fakeCategories, fakePostsByCategory, fakeSlides, getFakePostBySlug } from './mock-news-data';
import axios from "axios";
import type { NewsCategory, NewsPost, RankingRow, SiteConfig, SlideItem } from "@/utils/types";

// Calls are written as a direct `axios.get(...)` (no axios.create) with the
// env-driven base URL inlined in the template literal, so the asset-detector's
// literal `axios.get(` matcher can find them. Each endpoint mirrors
// Services/VPlayApiClient.cs of the original .NET project (game_id and
// language_name are sent on every website-api call).

const LANGUAGE = "vi";

export const getSiteConfig = async (): Promise<SiteConfig | null> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HUB}/api/frontend/config`, {
      params: { game_id: process.env.NEXT_PUBLIC_HUB_GAME_ID, language_name: LANGUAGE },
      timeout: 10000,
    });
    return res.data?.data ?? null;
  } catch (error) {
    return null;
  }
};

export const getCategories = async (): Promise<NewsCategory[]> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HUB}/api/frontend/home-categories`, {
      params: { game_id: process.env.NEXT_PUBLIC_HUB_GAME_ID, language_name: LANGUAGE },
      timeout: 10000,
    });
    return res.data?.data ?? [];
  } catch (error) {
    return fakeCategories();
  }
};

export const getPostsByCategory = async (categoryId: number, limit: number): Promise<NewsPost[]> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HUB}/api/frontend/posts`, {
      params: {
        game_id: process.env.NEXT_PUBLIC_HUB_GAME_ID,
        category_id: categoryId,
        limit,
        language_name: LANGUAGE,
      },
      timeout: 10000,
    });
    return res.data?.data ?? [];
  } catch (error) {
    return fakePostsByCategory(categoryId, limit);
  }
};

export const getPostBySlug = async (slug: string): Promise<NewsPost | null> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HUB}/api/frontend/posts/${encodeURIComponent(slug)}`, {
      params: { game_id: process.env.NEXT_PUBLIC_HUB_GAME_ID, language_name: LANGUAGE },
      timeout: 10000,
    });
    return res.data?.data ?? null;
  } catch (error) {
    return getFakePostBySlug(slug);
  }
};

export const getSlides = async (): Promise<SlideItem[]> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HUB}/api/frontend/slides`, {
      params: { game_id: process.env.NEXT_PUBLIC_HUB_GAME_ID, language_name: LANGUAGE },
      timeout: 10000,
    });
    return res.data?.data ?? [];
  } catch (error) {
    return fakeSlides();
  }
};

// Unlike the website-api hub, GetRanking returns the array directly (no
// "data" envelope) - same as the .NET client.
export const getRanking = async (mode: string, scope: string): Promise<RankingRow[]> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_RANKING_API}/Ranking/GetRanking`, {
      params: { gameId: process.env.NEXT_PUBLIC_RANKING_GAME_ID, mode, scope },
      timeout: 10000,
    });
    const body = res.data;
    return Array.isArray(body) ? body : body?.data ?? [];
  } catch (error) {
    return [];
  }
};
