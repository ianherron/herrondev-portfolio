"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Package, Layers, Clock, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function About() {
  const t      = useTranslations("About");
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { icon: Package, value: "3+",      label: t("stat_projects")  },
    { icon: Layers,  value: "2",       label: t("stat_saas")      },
    { icon: Clock,   value: "4+",      label: t("stat_years")     },
    { icon: Globe,   value: "EN / ES", label: t("stat_bilingual") },
  ];

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 700, height: 700,
          background: "radial-gradient(circle,rgba(37,99,235,0.07) 0%,transparent 70%)",
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
            {t("heading")} <span className="gradient-text">{t("heading_accent")}</span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Text */}
            <motion.div variants={fadeUp} className="space-y-5">
              <p className="text-slate-300 text-lg leading-relaxed">{t("p1")}</p>
              <p className="text-slate-400 leading-relaxed">{t("p2")}</p>
              <p className="text-slate-400 leading-relaxed">
                {t("p3").split("HerronDev").map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <span
                        className="font-semibold"
                        style={{
                          background: "linear-gradient(135deg,#2563EB,#06B6D4)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        HerronDev
                      </span>
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </p>
              <div
                className="h-px w-16 rounded-full mt-2"
                style={{ background: "linear-gradient(90deg,#2563EB,#06B6D4)" }}
              />
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="glass card-glow rounded-2xl p-6 flex flex-col items-center text-center"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      background: "linear-gradient(135deg,rgba(37,99,235,0.25),rgba(6,182,212,0.25))",
                    }}
                  >
                    <Icon size={20} style={{ color: "#06B6D4" }} />
                  </div>
                  <span className="text-2xl font-extrabold text-white mb-1">{value}</span>
                  <span className="text-xs text-slate-400 font-medium">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
