"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Experience() {
  const t      = useTranslations("Experience");
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const items = [
    {
      role:    t("herrondev_role"),
      company: t("herrondev_company"),
      period:  t("herrondev_period"),
      desc:    t("herrondev_desc"),
      current: true,
    },
    {
      role:    t("experian_role"),
      company: t("experian_company"),
      period:  t("experian_period"),
      desc:    t("experian_desc"),
      current: false,
    },
    {
      role:    t("foundever_role"),
      company: t("foundever_company"),
      period:  t("foundever_period"),
      desc:    t("foundever_desc"),
      current: false,
    },
  ];

  return (
    <section id="experience" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: 500, height: 500,
          background: "radial-gradient(circle,rgba(6,182,212,0.06) 0%,transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
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

          <div className="relative">
            {/* Line */}
            <div
              className="absolute left-5 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom,#2563EB,#06B6D4,transparent)" }}
            />

            <div className="space-y-10">
              {items.map((item) => (
                <motion.div key={item.company} variants={fadeUp} className="relative pl-16">
                  {/* Dot */}
                  <div
                    className="absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: item.current
                        ? "linear-gradient(135deg,#2563EB,#06B6D4)"
                        : "rgba(255,255,255,0.06)",
                      border: item.current ? "none" : "1px solid rgba(255,255,255,0.1)",
                      boxShadow: item.current ? "0 0 20px rgba(37,99,235,0.5)" : "none",
                    }}
                  >
                    <Briefcase size={16} style={{ color: item.current ? "#fff" : "#64748b" }} />
                  </div>

                  <div className="glass card-glow rounded-2xl p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">{item.role}</h3>
                        <p className="text-sm font-semibold" style={{ color: "#06B6D4" }}>{item.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.current && (
                          <span
                            className="text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{
                              background: "rgba(16,185,129,0.15)",
                              color: "#34d399",
                              border: "1px solid rgba(52,211,153,0.25)",
                            }}
                          >
                            {t("current_badge")}
                          </span>
                        )}
                        <span
                          className="text-xs font-medium px-3 py-1 rounded-full"
                          style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8" }}
                        >
                          {item.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
