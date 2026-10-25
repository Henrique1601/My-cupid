import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "MyCupid - Presente Digital Criativo Para Namorada e Namorado",
  description:
    "Crie uma declaração de amor digital personalizada com fotos, vídeos, música e mensagens. Presente criativo, barato e inesquecível para namorada, namorado, aniversário de namoro e datas especiais.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-rose-500 selection:text-white">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
