"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const NAV_KEYS = ["about", "projects", "skills", "experience", "contact"] as const;
const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  about:      "#about",
  projects:   "#projects",
  skills:     "#skills",
  experience: "#experience",
  contact:    "#contact",
};

export default function Navbar() {
  const t      = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [langOpen,  setLangOpen]  = useState(false);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const sections = NAV_KEYS.map((k) => document.querySelector(NAV_HREFS[k]));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Close lang dropdown on outside click */
  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [langOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const switchLocale = (next: "en" | "es") => {
    setLangOpen(false);
    router.replace(pathname, { locale: next });
  };

  const otherLocale = locale === "en" ? "es" : "en";
  const otherLabel  = locale === "en" ? "ES" : "EN";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b shadow-lg" : "bg-transparent"
      }`}
      style={scrolled ? { borderBottomColor: "rgba(255,255,255,0.08)" } : {}}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5"
          aria-label="Go to top"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/logo.png"
              alt="HerronDev Logo"
              fill
              className="object-contain"
              priority
              onError={() => {}}
            />
          </div>
          <span
            className="font-bold text-sm tracking-widest"
            style={{
              background: "linear-gradient(135deg,#2563EB 0%,#06B6D4 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            HERRON DEV
          </span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_KEYS.map((key) => (
            <li key={key}>
              <button
                onClick={() => handleNav(NAV_HREFS[key])}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === NAV_HREFS[key] ? "text-white" : "text-slate-400 hover:text-white"
                }`}
                style={
                  active === NAV_HREFS[key]
                    ? {
                        background:
                          "linear-gradient(135deg,rgba(37,99,235,0.15),rgba(6,182,212,0.15))",
                        boxShadow: "0 0 12px rgba(37,99,235,0.25)",
                      }
                    : {}
                }
              >
                {t(key)}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side: lang switcher + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 glass"
              aria-label="Switch language"
            >
              <Globe size={14} style={{ color: "#06B6D4" }} />
              <span className="tracking-wide">{locale.toUpperCase()}</span>
            </button>

            {langOpen && (
              <div
                className="absolute right-0 top-full mt-2 glass rounded-xl overflow-hidden border shadow-xl"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  minWidth: 90,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
                }}
              >
                {(["en", "es"] as const).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors duration-150 ${
                      loc === locale
                        ? "text-white"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                    style={
                      loc === locale
                        ? {
                            background:
                              "linear-gradient(135deg,rgba(37,99,235,0.2),rgba(6,182,212,0.2))",
                            color: "#06B6D4",
                          }
                        : {}
                    }
                  >
                    {loc === "en" ? "🇺🇸 English" : "🇨🇷 Español"}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="#contact" className="btn-primary text-sm px-5 py-2">
            {t("hire")}
          </a>
        </div>

        {/* Mobile: lang + burger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => switchLocale(otherLocale)}
            className="glass flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            aria-label={`Switch to ${otherLabel}`}
          >
            <Globe size={12} style={{ color: "#06B6D4" }} />
            {otherLabel}
          </button>
          <button
            className="text-white p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <ul className="flex flex-col px-6 py-4 gap-1">
            {NAV_KEYS.map((key) => (
              <li key={key}>
                <button
                  onClick={() => handleNav(NAV_HREFS[key])}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active === NAV_HREFS[key]
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {t(key)}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full justify-center text-sm"
              >
                {t("hire")}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
