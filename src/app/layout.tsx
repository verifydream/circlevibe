import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/layout/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CircleVibe — Bikin Lingkaran Kecil Hobi",
  description:
    "Temukan micro-circle 3-6 orang dengan hobi & vibe yang cocok. Meetup offline, bukan sekadar chat online.",
  keywords: ["komunitas", "hobi", "circle", "meetup", "Indonesia"],
  openGraph: {
    title: "CircleVibe",
    description: "Bikin lingkaran kecil buat hobi yang cocok vibe-nya",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}