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
    <div className="relative min-h-full flex flex-col page-surface overflow-x-clip">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero />
        <section id="about" className="relative scroll-mt-nav border-t border-[hsl(var(--surface-border)/0.4)]">
          <About />
        </section>
        <section id="experience" className="relative scroll-mt-nav bg-[hsl(var(--page-bg-alt)/0.65)] backdrop-blur-[2px] border-y border-[hsl(var(--surface-border)/0.4)]">
          <WorkExp />
        </section>
        <section id="activity" className="relative scroll-mt-nav border-b border-[hsl(var(--surface-border)/0.4)]">
          <DevActivity />
        </section>
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
