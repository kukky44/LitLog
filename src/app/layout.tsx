import type { Metadata } from "next";
import "./globals.css";

import FooterC from "./components/layout/footer";
import Header from "./components/layout/header";
import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Lit Log",
  description: "Store books iformation with memos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <div className="bg-violet-200 text-black flex flex-col min-h-screen">
            <Header />
            <NextTopLoader color="#4c1d95" showSpinner={false} shadow={false} />
            <div className="max-w-4xl mt-6 mx-auto px-8 w-full">
              {children}
            </div>
            <FooterC />
          </div>
        </Providers>
      </body>
    </html>
  );
}
