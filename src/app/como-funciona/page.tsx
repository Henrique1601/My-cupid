import Link from "next/link";
import { Heart, Sparkles, Clock, Music, QrCode, ArrowRight } from "lucide-react";

export default function ComoFuncionaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
          Passo a Passo
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4">
          Como Funciona o MyCupid
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto">
          Crie uma experiência inesquecível para o seu amor em apenas 3 passos simples.
        </p>
      </div>

      <div className="space-y-12">
        <div className="flex flex-col md:flex-row items-center gap-8 bg-zinc-900/60 border border-zinc-800 p-8 rounded-3xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-2xl font-bold flex-shrink-0">
            1
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Conte a História de Vocês</h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Você preenche o nome de vocês dois, a data em que o relacionamento começou e escreve uma declaração sincera. Nosso sistema gera um contador em tempo real que calcula anos, meses, dias, horas, minutos e segundos juntos.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 bg-zinc-900/60 border border-zinc-800 p-8 rounded-3xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-2xl font-bold flex-shrink-0">
            2
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Fotos, Trilha Sonora & Jogos</h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Adicione as fotos dos seus momentos favoritos, escolha a música do casal (que tocará num charmoso disco de vinil giratório) e ative minijogos como Quiz do Casal e Jogo da Memória.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 bg-zinc-900/60 border border-zinc-800 p-8 rounded-3xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-2xl font-bold flex-shrink-0">
            3
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Surpreenda com o Link ou QR Code</h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Você recebe na hora o link exclusivo da página e um QR Code em alta resolução. Você pode enviar no WhatsApp ou imprimir o QR Code para entregar em uma foto, cartinha ou presente físico!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/criar/fazer-eu-mesmo"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-sm shadow-xl shadow-rose-500/30"
        >
          <Heart className="w-4 h-4 fill-white" />
          Começar a Criar Agora
        </Link>
      </div>
    </div>
  );
}
