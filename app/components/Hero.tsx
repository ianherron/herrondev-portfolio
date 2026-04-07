"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, FolderOpen, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0  },
};

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Floating blobs */}
      <div className="blob" style={{ width: 600, height: 600, background: "#2563EB", top: "5%", left: "-15%" }} />
      <div className="blob blob-2" style={{ width: 500, height: 500, background: "#06B6D4", top: "20%", right: "-10%" }} />
      <div className="blob blob-3" style={{ width: 350, height: 350, background: "#7C3AED", bottom: "10%", left: "35%", opacity: 0.1 }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp} className="flex justify-center mb-6">
          <span
            className="glass px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#06B6D4", borderColor: "rgba(6,182,212,0.25)" }}
          >
            {t("eyebrow")}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6"
        >
          {t("heading1")}{" "}
          <span className="gradient-text">{t("heading2")}</span>
          <br />{t("heading3")}
        </motion.h1>

        {/* Name */}
        <motion.p variants={fadeUp} className="text-xl md:text-2xl font-semibold text-white mb-3">
          Ian Herron
        </motion.p>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-sm md:text-base font-medium tracking-wide mb-5"
          style={{ color: "#06B6D4" }}
        >
          {t("subtitle")}
        </motion.p>

        {/* Bio */}
        <motion.p
          variants={fadeUp}
          className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {t("bio_prefix")}{" "}
          <span className="text-white font-medium">Next.js</span>,{" "}
          <span className="text-white font-medium">TypeScript</span> &amp;{" "}
          <span className="text-white font-medium">Supabase</span>
          {t("bio_suffix")}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
          <a href="#projects" className="btn-primary text-base px-7 py-3">
            <FolderOpen size={18} />
            {t("cta_projects")}
          </a>
          <a href="#contact" className="btn-outline text-base px-7 py-3">
            <Mail size={18} />
            {t("cta_contact")}
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div variants={fadeUp} className="mt-20 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase text-slate-500">{t("scroll")}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={18} className="text-slate-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
