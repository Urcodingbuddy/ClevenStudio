"use client";

import { User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/components/common/avatar";
import Link from "next/link";

export default function ProfileAvatar({ session }: { session: any }) {
  if (!session) {
    return (
      <Link href={"/profile"}>
        <Avatar className="h-8 w-8 border border-zinc-800">
          <AvatarFallback className="bg-zinc-900 text-zinc-400">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Link>
    );
  }

  return (
    <Link href={"/profile"}>
      <Avatar className="h-8 w-8 border border-zinc-800">
        {session.user?.image ? (
          <AvatarImage
            src={session?.user?.image || "/placeholder.svg"}
            alt={session.user.name || "User"}
          />
        ) : (
          <AvatarFallback className="bg-zinc-900 text-zinc-400">
            {session.user?.name?.[0] || <User className="h-4 w-4" />}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
}
