import type { ReactNode } from "react"
import { ThemeProvider } from "@repo/components/ui/theme-provider"
import Sidebar from "@repo/components/ui/sideBar"
import { authOptions } from "../api/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if(!session) redirect('/signin');
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="flex h-screen overflow-hidden bg-[#0c0c0c] text-slate-200">
        <Sidebar />
        <div className="flex-1 ultra-scrollbar overflow-y-auto">{children}</div>
      </div>
    </ThemeProvider>
  )
}
