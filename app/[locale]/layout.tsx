import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ian Herron | Full-Stack Developer",
  description:
    "Full-stack developer from Costa Rica specialized in Next.js, TypeScript and Supabase. Available for remote work.",
  keywords: [
    "Ian Herron",
    "HerronDev",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "Supabase",
    "Costa Rica",
    "Remote",
    "SaaS",
  ],
  authors: [{ name: "Ian Herron", url: "https://herrondev.com" }],
  openGraph: {
    title: "Ian Herron | Full-Stack Developer",
    description:
      "Full-stack developer from Costa Rica specialized in Next.js, TypeScript and Supabase.",
    type: "website",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={inter.variable}>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
