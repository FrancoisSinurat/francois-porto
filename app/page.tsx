import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Hero from "@/components/Hero";
import WorkExp from "@/components/Experience";
import DevActivity from "@/components/DevActivity";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col page-surface">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <section id="about" className="scroll-mt-nav border-t border-[hsl(var(--surface-border)/0.4)]">
          <About />
        </section>
        <section id="experience" className="scroll-mt-nav page-surface-alt border-y border-[hsl(var(--surface-border)/0.4)]">
          <WorkExp />
        </section>
        <section id="activity" className="scroll-mt-nav border-b border-[hsl(var(--surface-border)/0.4)]">
          <DevActivity />
        </section>
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
