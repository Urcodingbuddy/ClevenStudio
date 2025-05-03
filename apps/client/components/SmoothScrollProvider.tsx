"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

type Props = {
  children: React.ReactNode;
};

export const SmoothScrollProvider = ({ children }: Props) => {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Defer init to allow DOM to be fully ready
      requestAnimationFrame(() => {
        if (!smootherRef.current) {
          smootherRef.current = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1,
            effects: true,
          });
        }
      });
    });

    return () => {
      ctx.revert(); // cleanup gsap context
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="h-full overflow-hidden">
      <div id="smooth-content">{children}</div>
    </div>
  );
};
