"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Autoplay, EffectCreative, Navigation, Pagination } from "swiper/modules";
import { useSite } from "./SiteContext";

// Port of the `.swiper-p4` block from index.js/landing.js. The original loads
// only swiper-bundle.min.js (no swiper CSS), so no swiper stylesheet is
// imported here either - index.css/landing.css style the .swiper-* classes.
export default function FeatureSwiper() {
  const { img } = useSite();
  const root = useRef<HTMLDivElement>(null);
  const prevEl = useRef<HTMLDivElement>(null);
  const nextEl = useRef<HTMLDivElement>(null);
  const pagEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const swiper = new Swiper(root.current, {
      modules: [Autoplay, EffectCreative, Navigation, Pagination],
      slidesPerView: "auto",
      spaceBetween: 0,
      centeredSlides: true,
      loop: true,
      speed: 800,
      autoplay: { delay: 4000, disableOnInteraction: false },
      effect: "creative",
      creativeEffect: {
        prev: { translate: ["-25%", 0, 0], scale: 0.8, opacity: 0.6 },
        next: { translate: ["25%", 0, 0], scale: 0.8, opacity: 0.6 },
      },
      pagination: { el: pagEl.current, clickable: true },
      navigation: { nextEl: nextEl.current, prevEl: prevEl.current },
    });
    return () => swiper.destroy(true, true);
  }, []);

  return (
    <div className="slider-p4">
      <div className="swiper swiper-p4" ref={root}>
        <div className="swiper-wrapper">
          {[1, 2, 3, 4, 5].map((i) => (
            <div className="swiper-slide" key={i}>
              <img src={`${img}/img-slide.png`} alt={`Slide ${i}`} className="imgFull" />
            </div>
          ))}
        </div>
      </div>
      <div className="swiper-button-prev p4-swiper-prev" ref={prevEl}></div>
      <div className="swiper-button-next p4-swiper-next" ref={nextEl}></div>
      <div className="swiper-pagination" ref={pagEl}></div>
    </div>
  );
}
