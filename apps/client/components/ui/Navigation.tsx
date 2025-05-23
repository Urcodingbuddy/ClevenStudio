"use client"

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useIsMobile } from "@repo/lib/hooks/use-mobile";
import DesktopNavigation from "@repo/packages/ui/DesktopNav";
import MobileNavigation from "@repo/packages/ui/MobileNav";

export function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileNavigation pathname={pathname} session={session} />;
  }

  return <DesktopNavigation pathname={pathname} session={session} />;
}


