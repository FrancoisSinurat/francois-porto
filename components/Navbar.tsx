"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-gray-800 shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Nama Profil */}
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors"
        >
          Francois Noval
        </Link>

        {/* Hamburger Button */}
        <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Navbar Links - Smooth Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-gray-800 shadow-md"
          >
            <ul className="flex flex-col space-y-4 px-6 py-4">
              {["About", "Experience", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-300 hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
