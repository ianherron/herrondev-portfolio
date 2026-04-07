import Navbar     from "@/app/components/Navbar";
import Hero       from "@/app/components/Hero";
import About      from "@/app/components/About";
import Projects   from "@/app/components/Projects";
import Skills     from "@/app/components/Skills";
import Experience from "@/app/components/Experience";
import Contact    from "@/app/components/Contact";
import Footer     from "@/app/components/Footer";

const Divider = ({ accent = false }: { accent?: boolean }) => (
  <div className="max-w-6xl mx-auto px-6">
    <div
      className="h-px"
      style={{
        background: accent
          ? "linear-gradient(90deg,transparent,rgba(37,99,235,0.3),rgba(6,182,212,0.3),transparent)"
          : "linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)",
      }}
    />
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#000000", color: "#f8fafc" }}>
      <Navbar />
      <Hero />
      <Divider accent />
      <About />
      <Divider />
      <Projects />
      <Divider />
      <Skills />
      <Divider />
      <Experience />
      <Divider accent />
      <Contact />
      <Footer />
    </main>
  );
}
