"use client";

import { User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar";
import Link from "next/link";
import { cn } from "@repo/lib/utils";

export default function ProfileAvatar({
  session,
  pathname,
  isActive,
}: {
  session: any;
  pathname?: string;
  isActive?: boolean;
}) {
  const active =
    isActive || pathname === "/profile" || pathname?.startsWith("/profile");

  return (
    <Link href="/profile">
      <Avatar
        className={cn(
          "h-8 w-8 border transition-colors",
          active
            ? "border-accent bg-accent/20 text-white"
            : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-accent-foreground"
        )}
      >
        {session?.user?.image ? (
          <AvatarImage
            src={session.user.image}
            alt={session.user.name || "User"}
          />
        ) : (
          <AvatarFallback>
            {session?.user?.name?.[0] || <User className="h-4 w-4" />}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
}
