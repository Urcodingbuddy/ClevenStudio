"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CloudUpload, FileText, Radar, ReceiptText, Search, Settings, Store } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/components/ui/tooltip"
import { cn } from "@repo/lib/utils"
import { useSession } from "next-auth/react"
import ProfileAvatar from "./ProfileAvatar"
const navigationLinks = [
  {
    label: "WorkSpace",
    href: "/workspace",
    icon: Radar,
    target : ""
  },
  {
    label: "Upload",
    href: "/upload",
    icon: CloudUpload,
    target : ""
  },
  {
    label: "Billing",
    href: "/billing",
    icon: ReceiptText,
    target : ""
  },
  {
    label: "Market Place",
    href: "/market-place",
    icon: Store,
    target : "_blank"
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  return (
    <TooltipProvider delayDuration={300}>
      <aside className="flex z-10 h-screen w-[60px] flex-col justify-between bg-[#121212] py-2">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <Link href="/" className="mb-4 flex h-10 w-10 items-center justify-center">
            <img src="/Cleven removeBg.png" className="h-7 w-auto object-cover" alt="Cleven Logo" />
          </Link>

          {/* Navigation */}
          <nav className="flex w-full flex-col items-center gap-5">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Tooltip key={link.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      target={link.target}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
                        isActive ? "bg-white/10 backdrop-blur-sm text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{link.label}</TooltipContent>
                </Tooltip>
              )
            })}
          </nav>
        </div>

        <div className="flex flex-col items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <ProfileAvatar session={session}/>
            </TooltipTrigger>
            <TooltipContent side="right">Profile</TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  )
}
