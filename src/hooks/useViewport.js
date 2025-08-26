import { useEffect, useState } from "react";
import { siteConfig } from "../data/config";

export function useViewport() {
  const { breakpoints } = siteConfig || {
    breakpoints: { mobileMax: 700, tabletMax: 1150 },
  };
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = width <= breakpoints.mobileMax;
  const isTablet =
    width > breakpoints.mobileMax && width <= breakpoints.tabletMax;
  const isDesktop = width > breakpoints.tabletMax;

  return { width, isMobile, isTablet, isDesktop, breakpoints };
}

export default useViewport;
