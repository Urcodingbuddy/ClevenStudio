"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CircleEllipsis, Home } from "lucide-react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Bug Fixing", href: "/pricing/bug-fixing" },
  { name: "Web Maintenance", href: "/pricing/web-maintenance" },
  { name: "Content Update", href: "/pricing/content-update" },
  { name: "MVP Package", href: "/pricing/mvp" },
  { name: "Speed Optimization", href: "/pricing/speed-optimization" },
];

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [visibleItems, setVisibleItems] = useState<NavigationItem[]>([]);
  const [overflowItems, setOverflowItems] = useState<NavigationItem[]>([]);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const thresholds = [570, 770, 870, 970, 1070];

  const updateNavigationItems = useCallback(() => {
    const width = window.innerWidth;
    let limit = navigation.length;

    for (let i = 0; i < thresholds.length; i++) {
      const threshold = thresholds[i];
      if (threshold !== undefined && width < threshold) {
        limit = i + 2;
        break;
      }
    }

    setVisibleItems(navigation.slice(0, limit));
    setOverflowItems(navigation.slice(limit));
  }, []);

  useEffect(() => {
    updateNavigationItems();
    window.addEventListener("resize", updateNavigationItems);
    return () => window.removeEventListener("resize", updateNavigationItems);
  }, [updateNavigationItems]);

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = useCallback((href: string) => pathname === href, [pathname]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="absolute top-0 left-0 right-0 py-6 px-8 z-10">
        <ul className="flex items-center justify-center gap-6 relative">
          {visibleItems.map((item) => (
            <li key={item.name} className="relative">
              <Link href={item.href}>
                <span
                  className={`font-medium flex items-center gap-2 transition-colors duration-200 ${
                    isActive(item.href) ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name === "Home" && <Home className="w-4 h-4" />}
                  {item.name}
                </span>
              </Link>
              {isActive(item.href) && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  layoutId="activeTab"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </li>
          ))}

          {overflowItems.length > 0 && (
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="More navigation items"
              >
                <CircleEllipsis className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-48 bg-[#0a0a0a] border border-blue-600 rounded shadow-lg overflow-hidden z-20"
                  >
                    {overflowItems.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <span
                          className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                            isActive(item.href)
                              ? "text-blue-500"
                              : "text-gray-200 hover:text-white"
                          }`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )}
        </ul>
      </nav>

      <main>{children}</main>
    </div>
  );
}
