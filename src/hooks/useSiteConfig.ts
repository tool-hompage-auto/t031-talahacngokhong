"use client";

import { useEffect, useState } from "react";
import { getSiteConfig } from "@/services";
import type { SiteConfig } from "@/utils/types";

// Returns null until the config request settles; consumers fall back to "#"
// exactly like `siteConfig?.X ?? "#"` in the Razor views.
export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  useEffect(() => {
    let alive = true;
    getSiteConfig().then((c) => alive && setConfig(c));
    return () => {
      alive = false;
    };
  }, []);
  return config;
}
