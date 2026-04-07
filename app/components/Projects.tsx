"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ExternalLink, Zap, Code2 } from "lucide-react";
import { useTranslations } from "next-intl";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const badgeStyles: Record<"green" | "yellow", React.CSSProperties> = {
  green:  { background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.25)" },
  yellow: { background: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)" },
};

export default function Projects() {
  const t      = useTranslations("Projects");
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const projects = [
    {
      name:       "NailFlow",
      desc:       t("nailflow_desc"),
      badge:      t("nailflow_badge"),
      badgeColor: "green" as const,
      stack:      ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Resend", "Lemon Squeezy", "Vercel"],
      link:       "https://nailflow.app",
    },
    {
      name:       "Arenanegracr",
      desc:       t("arenanegra_desc"),
      badge:      t("arenanegra_badge"),
      badgeColor: "yellow" as const,
      stack:      ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    },
    {
      name:       "Herron Inspection",
      desc:       t("inspection_desc"),
      badge:      t("inspection_badge"),
      badgeColor: "yellow" as const,
      stack:      ["Next.js", "next-intl", "Resend", "Tailwind CSS", "Vercel"],
    },
  ];

  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500, height: 500,
          background: "radial-gradient(circle,rgba(6,182,212,0.07) 0%,transparent 70%)",
          top: "10%", right: "-10%",
        }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "#06B6D4" }}
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold mb-16">
            <span className="gradient-text">{t("heading")}</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <motion.div
                key={p.name}
                variants={fadeUp}
                className="glass card-glow rounded-2xl p-7 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.25),rgba(6,182,212,0.25))" }}
                  >
                    <Code2 size={20} style={{ color: "#2563EB" }} />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={badgeStyles[p.badgeColor]}>
                    {p.badgeColor === "green" && <Zap size={10} className="inline mr-1" />}
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{p.desc}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {p.stack.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: "rgba(37,99,235,0.12)",
                        color: "#93c5fd",
                        border: "1px solid rgba(37,99,235,0.2)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary justify-center text-sm py-2.5"
                  >
                    <ExternalLink size={15} />
                    {t("view")}
                  </a>
                ) : (
                  <button disabled className="btn-outline justify-center text-sm py-2.5 opacity-50 cursor-not-allowed">
                    {t("coming_soon")}
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
