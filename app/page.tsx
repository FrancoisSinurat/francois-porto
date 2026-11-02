import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Hero from "@/components/Hero";
import WorkExp from "@/components/Experience";
import DevActivity from "@/components/DevActivity";
import Contact from "@/components/Contact";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function Home() {
  return (
    <div className="relative min-h-full flex flex-col overflow-x-clip">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero />
        {/* Transparent sections — one continuous animated canvas, no color-band gaps */}
        <section
          id="about"
          className="relative scroll-mt-nav border-t border-[hsl(var(--surface-border)/0.35)]"
        >
          <About />
        </section>
        <section
          id="experience"
          className="relative scroll-mt-nav border-t border-[hsl(var(--surface-border)/0.35)]"
        >
          <WorkExp />
        </section>
        <section
          id="activity"
          className="relative scroll-mt-nav border-t border-[hsl(var(--surface-border)/0.35)]"
        >
          <DevActivity />
        </section>
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
