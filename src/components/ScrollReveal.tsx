"use client";

import React, { useEffect, useRef, useState } from "react";

export type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "slide-up";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number; // in ms
  duration?: number; // in ms
  threshold?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.15,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's motion preferences
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const currentElem = elementRef.current;
    if (!currentElem) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(currentElem);

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, [threshold, once]);

  const getAnimationStyles = (): { initial: string; revealed: string } => {
    switch (animation) {
      case "fade-down":
        return {
          initial: "opacity-0 -translate-y-8 scale-[0.98]",
          revealed: "opacity-100 translate-y-0 scale-100",
        };
      case "fade-left":
        return {
          initial: "opacity-0 translate-x-8 scale-[0.98]",
          revealed: "opacity-100 translate-x-0 scale-100",
        };
      case "fade-right":
        return {
          initial: "opacity-0 -translate-x-8 scale-[0.98]",
          revealed: "opacity-100 translate-x-0 scale-100",
        };
      case "zoom-in":
        return {
          initial: "opacity-0 scale-90",
          revealed: "opacity-100 scale-100",
        };
      case "slide-up":
        return {
          initial: "opacity-0 translate-y-12",
          revealed: "opacity-100 translate-y-0",
        };
      case "fade-up":
      default:
        return {
          initial: "opacity-0 translate-y-8 scale-[0.99]",
          revealed: "opacity-100 translate-y-0 scale-100",
        };
    }
  };

  const { initial, revealed } = getAnimationStyles();

  return (
    <div
      ref={elementRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-all will-change-transform ${
        isVisible ? revealed : initial
      } ${className}`}
    >
      {children}
    </div>
  );
}
