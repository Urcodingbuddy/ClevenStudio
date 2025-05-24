import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import Link from "next/link";
import { cn } from "@repo/lib/utils";
import { navigationLinks } from "@repo/lib/navigationLinks";
import ProfileAvatar from "@repo/components/ui/ProfileAvatar";

export default function DesktopNavigation({
  pathname,
  session,
}: {
  pathname: string;
  session: any;
}) {
  return (
    <TooltipProvider delayDuration={300}>
      <aside className="hidden md:flex z-10 h-screen w-[60px] flex-col justify-between bg-[#121212] py-2">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="mb-4 flex h-10 w-10 items-center justify-center"
          >
            <img
              src="/Cleven removeBg.png"
              className="h-7 w-auto object-cover"
              alt="Cleven Logo"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex w-full flex-col items-center gap-5">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Tooltip key={link.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
                        isActive
                          ? "bg-white/10 backdrop-blur-sm text-white"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{link.label}</TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col mb-4 cursor-pointer items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <ProfileAvatar session={session} />
            </TooltipTrigger>
            <TooltipContent side="right">Profile</TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}
