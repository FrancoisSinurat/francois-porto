"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center bg-slate-950 text-white px-6 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-indigo-500 rounded-full opacity-40 blur-[150px]"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-500 rounded-full opacity-40 blur-[120px]"></div>
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative px-12 py-16 rounded-2xl   flex flex-col items-center justify-center w-full max-w-3xl"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Francois Novalentino Sinurat
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-xl">
          Software Development Enthusiast
        </p>

        <div className="mt-8">
          <Link
            href="#projects"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg shadow-lg hover:scale-105 hover:shadow-indigo-500/50 transition-transform duration-300"
          >
            View My Work
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
