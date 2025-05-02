import type { ReactNode } from "react"
import { ThemeProvider } from "@repo/components/ui/theme-provider"
import Sidebar from "@repo/components/ui/sideBar"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="flex h-screen overflow-hidden bg-[#0c0c0c] text-slate-200">
        <Sidebar />
        <div className="flex-1 ultra-scrollbar overflow-y-auto">{children}</div>
      </div>
    </ThemeProvider>
  )
}
