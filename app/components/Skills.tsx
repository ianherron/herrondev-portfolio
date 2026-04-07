"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const TECH = {
  frontend:     [
    { name: "Next.js",      color: "#ffffff" },
    { name: "React",        color: "#61DAFB" },
    { name: "TypeScript",   color: "#3178C6" },
    { name: "Tailwind CSS", color: "#06B6D4" },
    { name: "shadcn/ui",    color: "#ffffff" },
  ],
  backend: [
    { name: "Supabase",      color: "#3ECF8E" },
    { name: "PostgreSQL",    color: "#336791" },
    { name: "Resend",        color: "#ffffff" },
    { name: "Upstash Redis", color: "#DC382D" },
  ],
  integrations: [
    { name: "Lemon Squeezy", color: "#FFD700" },
    { name: "SINPE Móvil",   color: "#009B3A" },
    { name: "Vercel",        color: "#ffffff" },
  ],
  tools: [
    { name: "Git",     color: "#F05032" },
    { name: "GitHub",  color: "#ffffff" },
    { name: "Figma",   color: "#F24E1E" },
    { name: "VS Code", color: "#007ACC" },
  ],
};

function SkillBadge({ name, color }: { name: string; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass card-glow rounded-xl p-4 flex flex-col items-center gap-2 text-center"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base"
        style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
      <span className="text-xs font-medium text-slate-300 leading-tight">{name}</span>
    </motion.div>
  );
}

export default function Skills() {
  const t      = useTranslations("Skills");
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const categories = [
    { key: "frontend",     label: t("cat_frontend"),     skills: TECH.frontend     },
    { key: "backend",      label: t("cat_backend"),      skills: TECH.backend      },
    { key: "integrations", label: t("cat_integrations"), skills: TECH.integrations },
    { key: "tools",        label: t("cat_tools"),        skills: TECH.tools        },
  ];

  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600, height: 400,
          background: "radial-gradient(ellipse,rgba(37,99,235,0.08) 0%,transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "#06B6D4" }}
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold mb-16">
            {t("heading")} <span className="gradient-text">{t("heading_accent")}</span>
          </motion.h2>

          <div className="space-y-12">
            {categories.map((cat) => (
              <motion.div key={cat.key} variants={fadeUp}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8" style={{ background: "linear-gradient(90deg,#2563EB,#06B6D4)" }} />
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#06B6D4" }}>
                    {cat.label}
                  </span>
                  <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {cat.skills.map((skill) => (
                    <SkillBadge key={skill.name} {...skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
