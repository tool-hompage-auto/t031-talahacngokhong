"use client";

import { useEffect, useRef, useState } from "react";
import type { SlideItem } from "@/utils/types";

// Stand-in for jQuery owlCarousel v1 `{ autoPlay: true, singleItem: true }`
// (5s auto-advance, 200ms slide, 1s rewind), keeping the owl-* wrapper
// classes that index.css sizes (#slider-p2 .owl-wrapper-outer/.owl-item).
// Like owl v1, item width is the container width rounded to whole pixels and
// the wrapper is 2x the items' total width - this is what keeps the pixels
// identical to the original at fractional vw widths.
export default function OwlSlider({ slides, fallback }: { slides: SlideItem[] | null; fallback: string }) {
  const items = slides && slides.length > 0 ? slides : null;
  const count = items ? items.length : 1;
  const [index, setIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => root.current && setItemWidth(Math.round(root.current.getBoundingClientRect().width));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (count < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(t);
  }, [count]);

  const rewinding = index === 0 && count > 1;
  const w = itemWidth || undefined;
  return (
    <div id="slider-p2" className="owl-carousel owl-theme" style={{ display: "block" }} ref={root}>
      <div className="owl-wrapper-outer">
        <div
          className="owl-wrapper"
          style={{
            width: w ? w * count * 2 : `${count * 100}%`,
            display: "block",
            transform: `translate3d(${-index * itemWidth}px, 0px, 0px)`,
            transition: `transform ${rewinding ? 1000 : 200}ms ease`,
          }}
        >
          {slides === null
            ? null
            : items
              ? items.map((slide, i) => (
                  <div className="owl-item" style={{ width: w }} key={i}>
                    <div className="item">
                      <a href={slide.link || "#"}>
                        <img src={slide.image} alt={slide.title ?? ""} className="imgFull" />
                      </a>
                    </div>
                  </div>
                ))
              : (
                <div className="owl-item" style={{ width: w }}>
                  <div className="item">
                    <img src={fallback} alt="Slide" className="imgFull" />
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
}
