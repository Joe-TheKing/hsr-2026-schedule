import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STOP-NCD at HSR 2026 | Session Schedule",
  description:
    "Explore STOP-NCD sessions at the Ninth Global Symposium on Health Systems Research (HSR 2026), 7–9 December 2026 at The American University in Cairo (AUC), Egypt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inclusive+Sans:ital@0;1&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
