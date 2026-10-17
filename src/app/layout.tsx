import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { SITE_CONFIG } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: SITE_CONFIG.name, template: SITE_CONFIG.titleTemplate },
  description: SITE_CONFIG.description,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={SITE_CONFIG.language}>
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <Header />
        <main className="mx-auto w-full max-w-3xl px-6 py-16">{children}</main>
      </body>
    </html>
  );
}
