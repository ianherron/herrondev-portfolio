"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t    = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-10 px-6" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          {t("copy", { year })}
        </p>
        <nav className="flex gap-5">
          {[
            ["About",    "#about"     ],
            ["Projects", "#projects"  ],
            ["Skills",   "#skills"    ],
            ["Contact",  "#contact"   ],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-xs text-slate-600 hover:text-slate-300 transition-colors duration-150 font-medium tracking-wide"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
