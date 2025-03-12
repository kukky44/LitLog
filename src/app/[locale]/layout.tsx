import type { Metadata } from "next";
import "./globals.css";

import FooterC from "../components/layout/footer";
import Header from "../components/layout/header";
import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import LoadingAnimation from "../components/ui/buttons/loadingAnimation";
import type { Viewport } from 'next'

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from "@/src/i18n/routing";

export const metadata: Metadata = {
  title: "Lit Log",
  description: "Store books iformation with memos",
};


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "ja")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <div className="bg-violet-200 text-black flex flex-col min-h-screen">
              <Suspense fallback={<LoadingAnimation />}>
                <Header />
                <NextTopLoader color="#4c1d95" showSpinner={false} shadow={false} />
              </Suspense>
              <div className="max-w-4xl mt-6 mx-auto sm:px-8 px-6 w-full">
                {children}
              </div>
              <FooterC />
            </div>
          </Providers>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}
