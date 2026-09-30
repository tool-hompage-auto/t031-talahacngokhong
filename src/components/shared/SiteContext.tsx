"use client";

import { createContext, useContext } from "react";
import type { SiteConfig } from "@/utils/types";

export type Variant = "site" | "landing";

interface SiteCtx {
  config: SiteConfig | null;
  /** Static image root: the landing page ships its own (differently-drawn) image set. */
  img: string;
}

export const SiteContext = createContext<SiteCtx>({ config: null, img: "/legacy/img" });

export const useSite = () => useContext(SiteContext);

export const imgBase = (variant: Variant) => (variant === "landing" ? "/legacy/landing/img" : "/legacy/img");
