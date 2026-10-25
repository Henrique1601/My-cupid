import Link from "next/link";
import { Bot, PenTool, Sparkles, Heart } from "lucide-react";

export default function CriarSelectionPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
        Criar Presente Digital
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
        Como você prefere criar sua declaração?
      </h1>
      <p className="text-sm text-zinc-400 mt-2 max-w-md mx-auto">
        Escolha entre conversar com nossa inteligência artificial ou preencher cada detalhe manualmente.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
        {/* Option 1: AI Chat */}
        <Link
          href="/chat"
          className="group p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-rose-500/50 hover:bg-zinc-900/90 transition-all flex flex-col justify-between relative shadow-xl"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
              Conversar com o Cupido IA
              <Sparkles className="w-4 h-4 text-rose-400" />
            </h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              O Cupido te faz algumas perguntas simples e cria a página inteira em menos de 3 minutos de forma mágica.
            </p>
          </div>
          <div className="mt-8 text-xs font-semibold text-rose-400 flex items-center gap-1">
            Iniciar conversa com a IA →
          </div>
        </Link>

        {/* Option 2: DIY */}
        <Link
          href="/criar/fazer-eu-mesmo"
          className="group p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-rose-500/50 hover:bg-zinc-900/90 transition-all flex flex-col justify-between relative shadow-xl"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 mb-6 group-hover:scale-110 transition-transform">
              <PenTool className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
              Fazer Eu Mesmo
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Controle total de cada seção: escolha as fotos, a música do YouTube, a linha do tempo e configure quizzes interativos.
            </p>
          </div>
          <div className="mt-8 text-xs font-semibold text-rose-400 flex items-center gap-1">
            Abrir editor completo →
          </div>
        </Link>
      </div>
    </div>
  );
}
