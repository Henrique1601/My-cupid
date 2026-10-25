"use client";

import { useEffect, useState, use } from "react";
import { DeclarationData } from "@/types/declaration";
import { getDeclarationBySlug, DEMO_DECLARATION } from "@/lib/storage";
import { EnvelopeModal } from "@/components/EnvelopeModal";
import { RelationshipTimer } from "@/components/RelationshipTimer";
import { MusicPlayer } from "@/components/MusicPlayer";
import { CoupleQuiz } from "@/components/CoupleQuiz";
import { MemoryGame } from "@/components/MemoryGame";
import { Heart, Calendar, Sparkles, MapPin, Quote } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function PresenteSlugPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [data, setData] = useState<DeclarationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getDeclarationBySlug(slug);
      if (res) {
        setData(res);
      } else {
        // Fallback to demo
        setData(DEMO_DECLARATION);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-400 gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
        <p className="text-sm font-medium">Carregando experiência de amor...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 relative selection:bg-rose-500 selection:text-white pb-24">
      {/* Background romantic glow */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-rose-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-pink-600/10 blur-[130px] rounded-full" />
      </div>

      {/* Sealed Envelope Opening Modal */}
      {!envelopeOpened && (
        <EnvelopeModal
          partnerName={data.partnerName}
          yourName={data.yourName}
          onOpen={() => setEnvelopeOpened(true)}
        />
      )}

      {/* Main Experience Content */}
      <div className="max-w-3xl mx-auto px-4 pt-12 space-y-16">
        {/* Header & Couple Names */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>Nossa História de Amor</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif italic text-white tracking-tight">
            {data.partnerName} & {data.yourName}
          </h1>

          {data.headline && (
            <p className="text-sm sm:text-base text-zinc-300 max-w-lg mx-auto leading-relaxed">
              &ldquo;{data.headline}&rdquo;
            </p>
          )}
        </section>

        {/* Real-time Relationship Counter */}
        <section className="text-center">
          <RelationshipTimer startDate={data.startDate} />
        </section>

        {/* Music Player */}
        <section>
          <MusicPlayer
            title={data.musicTitle || "Nossa Trilha Sonora"}
            artist={data.musicArtist || "Com Todo Meu Amor"}
            youtubeUrl={data.youtubeUrl}
          />
        </section>

        {/* Love Letter */}
        <section className="bg-zinc-900/60 border border-rose-500/20 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-md relative">
          <Quote className="w-10 h-10 text-rose-500/30 absolute top-6 left-6" />
          <div className="relative z-10 pt-4">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white mb-6 text-center">
              Para você, com todo meu coração ❤️
            </h2>
            <div className="text-zinc-200 text-sm sm:text-base leading-loose whitespace-pre-line font-serif">
              {data.loveLetter}
            </div>
            <div className="mt-8 text-right font-script text-2xl text-rose-400">
              Com amor, {data.yourName}
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        {data.photos && data.photos.length > 0 && (
          <section className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase text-rose-400 tracking-wider">
                Momentos Que Valem Ouro
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Nossa Galeria de Memórias 📸
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.photos.map((url, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl overflow-hidden border border-zinc-800 shadow-lg bg-zinc-900 aspect-square hover:border-rose-500/50 transition-all"
                >
                  <img
                    src={url}
                    alt={`Foto ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Timeline of Memories */}
        {data.timeline && data.timeline.length > 0 && (
          <section className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase text-rose-400 tracking-wider">
                Nossa Trajetória
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Linha do Tempo dos Momentos Marcantes ✨
              </h2>
            </div>

            <div className="relative border-l-2 border-rose-500/30 ml-4 sm:ml-8 pl-6 space-y-8">
              {data.timeline.map((item, idx) => (
                <div key={item.id || idx} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-rose-500 border-4 border-zinc-950 group-hover:scale-125 transition-transform" />

                  <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 hover:border-rose-500/40 transition-colors">
                    <span className="text-xs font-semibold text-rose-400">{item.date}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quiz do Casal */}
        {data.enableQuiz && data.quizQuestions && data.quizQuestions.length > 0 && (
          <section>
            <CoupleQuiz questions={data.quizQuestions} />
          </section>
        )}

        {/* Jogo da Memória */}
        {data.enableMemoryGame && data.photos && data.photos.length >= 2 && (
          <section>
            <MemoryGame photos={data.photos} />
          </section>
        )}

        {/* Create Your Own CTA */}
        <section className="text-center pt-10 border-t border-zinc-900">
          <p className="text-xs text-zinc-500">
            Gostou desta surpresa? Você também pode criar uma para quem você ama!
          </p>
          <Link
            href="/criar/fazer-eu-mesmo"
            className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-rose-300 hover:text-white transition-colors"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500" /> Criar Minha Própria Página
          </Link>
        </section>
      </div>
    </div>
  );
}
