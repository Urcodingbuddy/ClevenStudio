import type React from "react";
import Sidebar from "@repo/components/ui/sideBar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex overflow-hidden">
      <Sidebar />
      <div className="
      overflow-y-scroll">
      {children}
      </div>
    </main>
  );
}
