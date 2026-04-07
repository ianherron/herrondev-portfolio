// Root layout — the [locale] layout provides the full <html> structure.
// This file is required by Next.js but delegates rendering to the locale segment.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
