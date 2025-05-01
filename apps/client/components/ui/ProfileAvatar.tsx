"use client"
import Image from "next/image";
import Link from "next/link";

export default function ProfileAvatar({ session }: { session: any }) {
  const imageSrc = session?.user?.image
    ? session.user.image
    : `https://robohash.org/${encodeURIComponent(session?.user?.name || "user")}.png`;

  const altText = session?.user ? "Profile" : "User";

  return (
    <Link
      href="/profile"
      className="flex h-10 w-10 items-center justify-center rounded-full text-white"
    >
      <Image
        src={imageSrc}
        alt={altText}
        className="rounded-full border border-white"
        width={30}
        height={30}
      />
    </Link>
  );
}
