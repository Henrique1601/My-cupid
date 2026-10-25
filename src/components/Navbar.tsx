"use client";

import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-rose-500/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-500 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white flex items-center gap-1">
            MyCupid<span className="text-rose-500">.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          <Link href="/#como-funciona" className="hover:text-white transition-colors">
            Como Funciona
          </Link>
          <Link href="/#recursos" className="hover:text-white transition-colors">
            Recursos
          </Link>
          <Link href="/#precos" className="hover:text-white transition-colors">
            Preços
          </Link>
          <Link href="/p/demo" className="text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Ver Demonstração
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/chat"
            className="hidden sm:inline-flex text-xs font-medium text-zinc-300 hover:text-white px-3 py-2 rounded-full border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            Cupido IA 🤖
          </Link>
          <Link
            href="/criar/fazer-eu-mesmo"
            className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-4 py-2 rounded-full shadow-lg shadow-rose-500/25 transition-all transform active:scale-95 flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            Criar Página
          </Link>
        </div>
      </div>
    </nav>
  );
}
