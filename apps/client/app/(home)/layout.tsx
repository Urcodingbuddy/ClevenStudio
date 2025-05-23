import type { ReactNode } from "react";
import { ThemeProvider } from "@repo/components/ui/theme-provider";
import { authOptions } from "../api/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Navigation } from "@repo/components/ui/Navigation";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="flex h-screen overflow-hidden bg-[#0c0c0c] text-slate-200">
        <Navigation />
        <div className="flex-1 ultra-scrollbar overflow-y-auto pb-16 md:pb-0">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
