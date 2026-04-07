"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Mail, MessageCircle, Link2, MapPin, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Contact() {
  const t      = useTranslations("Contact");
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const contacts = [
    { icon: Mail,            label: t("email_label"),    sub: "ian@herrondev.com",           href: "mailto:ian@herrondev.com",          color: "#2563EB" },
    { icon: MessageCircle,   label: t("whatsapp_label"), sub: "+506 0000-0000",              href: "https://wa.me/50600000000",         color: "#25D366" },
    { icon: Link2,           label: t("linkedin_label"), sub: "linkedin.com/in/ianherron",   href: "https://linkedin.com/in/ianherron", color: "#0A66C2" },
  ];

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      <div className="blob"   style={{ width: 500, height: 500, background: "#2563EB", bottom: "-10%", left: "-10%", opacity: 0.12 }} />
      <div className="blob blob-2" style={{ width: 400, height: 400, background: "#06B6D4", top: "-5%", right: "-5%", opacity: 0.1 }} />

      <div className="max-w-4xl mx-auto text-center" ref={ref}>
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

          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold mb-5">
            {t("heading1")} <span className="gradient-text">{t("heading2")}</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-slate-400 text-lg mb-14 max-w-xl mx-auto">
            {t("subtext")}
          </motion.p>

          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="grid sm:grid-cols-3 gap-5 mb-14"
          >
            {contacts.map(({ icon: Icon, label, sub, href, color }) => (
              <motion.a
                key={label}
                variants={fadeUp}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="glass card-glow rounded-2xl p-6 flex flex-col items-center gap-3 group no-underline"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  style={{ background: `${color}20`, border: `1px solid ${color}30` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
                </div>
                <span
                  className="text-xs font-semibold flex items-center gap-1 transition-colors duration-200 group-hover:text-white"
                  style={{ color }}
                >
                  {t("connect")} <ArrowRight size={12} />
                </span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center">
            <span className="glass inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-slate-400">
              <MapPin size={14} style={{ color: "#06B6D4" }} />
              {t("location")}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
