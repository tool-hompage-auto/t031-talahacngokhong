"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "./SiteContext";

const CHARS = [
  { n: 1, alt: "Hoa Quả Sơn" },
  { n: 2, alt: "Long Cung" },
  { n: 3, alt: "Vạn Yêu" },
  { n: 4, alt: "Thiên Cung" },
];

// Port of index.js/landing.js "Character Switching". The Home page uses the
// `page3-*` class prefix and the landing page `page2-*`; the landing's main
// art image also has a different class name (page2-main-img vs page3-art-img).
export default function CharSelector({ prefix, artClass }: { prefix: "page2" | "page3"; artClass: string }) {
  const { img } = useSite();
  const [active, setActive] = useState(1);
  const [changing, setChanging] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const select = (n: number) => {
    if (n === active) return;
    setChanging(true);
    timer.current = setTimeout(() => {
      setActive(n);
      setChanging(false);
    }, 300);
  };
  const prev = () => select(active === 1 ? CHARS.length : active - 1);
  const next = () => select(active === CHARS.length ? 1 : active + 1);
  const ch = changing ? " changing" : "";

  return (
    <div className={`${prefix}-content`}>
      <div className={`${prefix}-art`}>
        <img src={`${img}/char${active}-art.webp`} alt="Hoa Quả Sơn" className={`${artClass} showOnPc imgFull${ch}`} />
        <img src={`${img}/char${active}-art-mb.webp`} alt="Hoa Quả Sơn" className={`${artClass} showOnMobile imgFull${ch}`} />
      </div>
      <div className={`${prefix}-name pa`}>
        <img src={`${img}/char${active}-name.webp`} alt="Hoa Quả Sơn" className={`${prefix}-name-img imgFull${ch}`} />
      </div>
      <div className={`${prefix}-skill pa${ch}`}>
        <img src={`${img}/char${active}-skill.webp`} alt="Skill" className={`${prefix}-skill-img showOnPc imgFull`} />
        <img src={`${img}/char${active}-skill-mb.webp`} alt="Skill" className={`${prefix}-skill-img showOnMobile imgFull`} />
      </div>
      <div className={`${prefix}-chiso pa`}>
        <img src={`${img}/char${active}-chiso.webp`} alt="Stats" className={`${prefix}-chiso-img imgFull${ch}`} />
      </div>
      <div className={`${prefix}-btns`}>
        <button type="button" className="btn-prev" onClick={prev}></button>
        <div className={`${prefix}-btn-inner`}>
          {CHARS.map((c) => (
            <button
              key={c.n}
              className={`${prefix}-btn btn${c.n}${active === c.n ? " active" : ""}`}
              type="button"
              onClick={() => select(c.n)}
            >
              <img src={`${img}/char${c.n}-btn.webp`} alt={c.alt} className="imgFull" />
            </button>
          ))}
        </div>
        <button type="button" className="btn-next" onClick={next}></button>
      </div>
    </div>
  );
}
