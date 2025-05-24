"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "@repo/lib/utils";
import { navigationLinks } from "@repo/lib/navigationLinks";

export default function MobileNavigation({
    pathname,
    session,
  }: {
    pathname: string;
    session: any;
  }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  
    // Add profile to navigation links for mobile
    const mobileNavLinks = [
      ...navigationLinks,
      {
        label: "Profile",
        href: "/profile",
        icon: User,
      },
    ];
  
    // Find active index based on pathname
    useEffect(() => {
      const index = mobileNavLinks.findIndex((link) => link.href === pathname);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }, [pathname]);
  
    // Update indicator position when active index changes
    useEffect(() => {
      if (indicatorRef.current && iconRefs.current[activeIndex]) {
        const activeIcon = iconRefs.current[activeIndex];
        if (activeIcon) {
          const rect = activeIcon.getBoundingClientRect();
          const parentRect =
            activeIcon.parentElement?.getBoundingClientRect() || rect;
  
          // Calculate position relative to the parent container
          const top = activeIcon.offsetTop;
          const left = activeIcon.offsetLeft;
  
          indicatorRef.current.style.width = `${rect.width + 8}px`;
          indicatorRef.current.style.height = `${rect.height + 8}px`;
          indicatorRef.current.style.transform = `translate(${left - 4}px, ${top - 4}px)`;
        }
      }
    }, [activeIndex]);
  
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#121212] border-t border-zinc-800">
        <div className="relative flex items-center justify-around h-14 px-2">
          {mobileNavLinks.map((link, index) => {
            const isActive = index === activeIndex;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center justify-center py-1"
              >
                <div
                  ref={(el) => {
                    iconRefs.current[index] = el;
                  }}
                  className="flex items-center justify-center w-6 h-6 mb-1"
                >
                  <link.icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive ? "text-white" : "text-zinc-400"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] transition-colors",
                    isActive ? "text-white" : "text-zinc-500"
                  )}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
  