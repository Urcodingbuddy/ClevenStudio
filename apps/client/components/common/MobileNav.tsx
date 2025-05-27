"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@repo/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { navigationLinks } from "@repo/lib/navigationLinks";
import ProfileAvatar from "@repo/components/ui/ProfileAvatar";

const profileLink = {
  href: "/profile",
  label: "Profile",
  icon: null, // Not used, handled by ProfileAvatar
};

export default function MobileNavigation({
  pathname,
  session,
}: {
  pathname: string;
  session: any;
}) {
  // Combine navigation links and profile link for active index logic
  const allLinks = [...navigationLinks, profileLink];
  const [activeIndex, setActiveIndex] = useState(0);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Find active index based on pathname
    const index = allLinks.findIndex((link) =>
      pathname === link.href ||
      (link.href !== "/" && pathname.startsWith(link.href))
    );
    setActiveIndex(index !== -1 ? index : 0);
  }, [pathname]);

  useEffect(() => {
    if (indicatorRef.current && iconRefs.current[activeIndex]) {
      const activeIcon = iconRefs.current[activeIndex];
      if (activeIcon) {
        const rect = activeIcon.getBoundingClientRect();
        const parentRect =
          activeIcon.parentElement?.getBoundingClientRect() || rect;
        const top = activeIcon.offsetTop;
        const left = activeIcon.offsetLeft;
        indicatorRef.current.style.width = `${rect.width + 8}px`;
        indicatorRef.current.style.height = `${rect.height + 8}px`;
        indicatorRef.current.style.transform = `translate(${left - 4}px, ${top - 4}px)`;
      }
    }
  }, [activeIndex]);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#121212] border-t border-zinc-800">
        <div className="relative flex items-center justify-around h-14 px-2">
          {navigationLinks.map((link, index) => {
            const isActive = index === activeIndex;
            return (
              <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className="flex flex-col items-center justify-center py-1"
                  >
                    <div
                      ref={(el) => {
                        iconRefs.current[index] = el;
                      }}
                      className={cn(
                        "flex items-center justify-center hover:bg-muted w-10 h-10 rounded-full mb-1",
                        isActive ? "bg-accent" : "bg-transparent"
                      )}
                    >
                      <link.icon
                        className={cn(
                          "h-6 w-6 transition-colors",
                          isActive ? "text-white" : "text-zinc-400"
                        )}
                      />
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">{link.label}</TooltipContent>
              </Tooltip>
            );
          })}
          {/* Profile Avatar as last nav item */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                ref={(el) => {
                  iconRefs.current[navigationLinks.length] = el;
                }}
                className={cn(
                  "flex items-center justify-center hover:bg-muted w-10 h-10 rounded-full mb-1",
                  activeIndex === navigationLinks.length ? "bg-accent" : "bg-transparent"
                )}
              >
                <ProfileAvatar
                  session={session}
                  pathname={pathname}
                  isActive={activeIndex === navigationLinks.length}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              {session?.user?.name || "Profile"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
