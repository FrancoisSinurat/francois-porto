"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope, FaGitlab } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Wobble from "@/components/ui/Wobble";

const links = [
  { href: "https://www.linkedin.com/in/francoisnoval", label: "LinkedIn", icon: FaLinkedin },
  { href: "https://github.com/FrancoisSinurat", label: "GitHub", icon: FaGithub },
  { href: "https://gitlab.com/novalsinurat28", label: "GitLab", icon: FaGitlab },
  { href: "https://www.instagram.com/francoisnoval", label: "Instagram", icon: FaInstagram },
  { href: "mailto:novalsinurat28@gmail.com", label: "novalsinurat28@gmail.com", icon: FaEnvelope },
];

export default function Contact() {
  return (
    <section id="contact" className="relative section-padding border-t border-[hsl(var(--surface-border)/0.35)] scroll-mt-nav">
      <div className="section-container">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">
          <SectionHeader
            label="Contact"
            title="Let's connect"
            description="Open to full-time roles, freelance, and collaborations."
          />

          <Wobble intensity="medium">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-surface p-6 sm:p-8"
            >
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
                Based in <strong className="text-[hsl(var(--foreground))]">Bekasi City, Indonesia</strong>.
                Reach out through any channel — I typically respond within 1–2 days.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {links.map(({ href, label, icon: Icon }) => (
                  <Wobble key={label} intensity="soft">
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 p-4 rounded-xl border border-[hsl(var(--surface-border)/0.7)] bg-[hsl(var(--page-bg-alt)/0.4)] hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-soft)/0.5)] transition-colors group"
                    >
                      <span className="flex items-center gap-3 text-sm font-medium text-[hsl(var(--foreground))]">
                        <Icon className="h-4 w-4 text-[hsl(var(--accent))]" />
                        {label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--accent))] transition-colors" />
                    </a>
                  </Wobble>
                ))}
              </div>
            </motion.div>
          </Wobble>
        </div>
      </div>
    </section>
  );
}
