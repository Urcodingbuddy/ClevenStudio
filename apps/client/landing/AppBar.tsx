"use client";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InteractiveHoverButton } from "@repo/landing/hoverBtn";

gsap.registerPlugin(ScrollTrigger);

export const AppBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navRef = useRef(null);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-transparent shadow-md"
      >
        <div className="flex justify-between items-center px-4 md:px-6 py-4">
          <div id="cleven_logo">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="./Cleven removeBg.png"
                alt="cleven.studio"
                className="h-10 object-cover cursor-pointer"
              />
              <h2 className="text-lg">Cleven.Studio</h2>
            </Link>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-14 text-[#D9D9D9]">
            <Link href="#" className="text-[1.1rem] hover:scale-110 transition">
              Services
            </Link>
            <Link href="/help-center" className="text-[1.1rem] hover:scale-110 transition">
              Help
            </Link>
            <Link href="./insights" className="text-[1.1rem] hover:scale-110 transition">
              Insight's
            </Link>
            <Link href="/signup">
              <InteractiveHoverButton>Join Us</InteractiveHoverButton>
            </Link>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden fixed top-4 right-4 z-[60] text-[#D9D9D9]">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white focus:outline-none"
            >
              <motion.div animate={{ rotate: isSidebarOpen ? 180 : 0 }}>
                <AnimatePresence mode="wait">
                  {isSidebarOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <X size={32} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Menu size={32} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed top-[80px] right-0 left-auto h-[calc(100vh-80px)] border-t w-full backdrop-blur-3xl text-white transition-transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } duration-300 z-50 shadow-lg`}
      >
        <ul className="flex flex-col h-full items-center justify-evenly text-lg">
          <Link href="#" className="hover:scale-110 border-b pb-2">Services</Link>
          <Link href="/help-center" className="hover:scale-110 border-b pb-2">Help</Link>
          <Link href="./insights" className="hover:scale-110 border-b pb-2">Insight's</Link>
          <Link href="/signup">
            <InteractiveHoverButton>Join Us</InteractiveHoverButton>
          </Link>
        </ul>
      </div>
    </>
  );
};
