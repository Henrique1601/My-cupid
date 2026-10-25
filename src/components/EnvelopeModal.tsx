"use client";

import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface EnvelopeModalProps {
  partnerName: string;
  yourName: string;
  onOpen: () => void;
}

export function EnvelopeModal({ partnerName, yourName, onOpen }: EnvelopeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
    });
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-xl p-4">
      {/* Background glowing aura */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-rose-500/20 blur-3xl -z-10 pointer-events-none" />

      <div className="flex flex-col items-center max-w-sm w-full text-center">
        {/* Envelope container */}
        <div
          onClick={handleOpen}
          className={`relative w-64 sm:w-72 h-44 bg-gradient-to-br from-rose-950 to-neutral-900 border-2 border-rose-500/40 rounded-2xl shadow-2xl shadow-rose-950/80 cursor-pointer transform transition-all duration-700 group hover:scale-105 ${
            isOpen ? "scale-110 opacity-0 -translate-y-12" : "scale-100 opacity-100"
          }`}
        >
          {/* Envelope flap triangular fold */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-rose-900/40 border-b border-rose-500/30 rounded-t-2xl flex items-center justify-center">
            {/* Wax seal */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 border-2 border-rose-300 shadow-lg shadow-rose-600/50 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 fill-white" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center text-xs text-rose-200/90 font-medium">
            <span className="font-serif italic text-sm">Para: {partnerName}</span>
            <span className="text-[10px] text-zinc-400 mt-0.5">De: {yourName}</span>
          </div>
        </div>

        {/* Prompt */}
        <div className="mt-8">
          <p className="text-white text-lg font-semibold flex items-center justify-center gap-1.5">
            Você recebeu uma declaração especial!
          </p>
          <p className="text-zinc-400 text-xs mt-1">
            Toque no envelope acima para abrir seu presente digital ❤️
          </p>
          <button
            onClick={handleOpen}
            className="mt-5 inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-rose-500/30 transition-all transform active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            Abrir Agora
          </button>
        </div>
      </div>
    </div>
  );
}
