import Link from "next/link";
import { Heart, Sparkles, Clock, Music, Image as ImageIcon, HelpCircle, ShieldCheck, ArrowRight, Star, QrCode } from "lucide-react";
import { RelationshipTimer } from "@/components/RelationshipTimer";
import { MusicPlayer } from "@/components/MusicPlayer";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-rose-600/15 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-0 w-[400px] h-[300px] bg-pink-600/10 blur-[120px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-6 animate-pulse-slow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pronto em menos de 5 minutos ✨</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-[1.15]">
          A reação dela quando abrir… <br className="hidden sm:inline" />
          <span className="gradient-text font-serif italic">isso não tem preço.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Uma página de amor com as fotos, a música e a história de vocês. Pronta em 5 minutos. Ela abre pelo celular e se emociona na hora.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/criar/fazer-eu-mesmo"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-base shadow-xl shadow-rose-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
          >
            <Heart className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
            Criar Minha Página de Amor
          </Link>
          <Link
            href="/p/demo"
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-medium text-sm transition-all flex items-center justify-center gap-2"
          >
            Ver Demonstração Ao Vivo
            <ArrowRight className="w-4 h-4 text-zinc-400" />
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-400">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <span>Mais de <strong>12.400 casais</strong> já se emocionaram</span>
        </div>

        {/* Interactive Phone Mockup / Live Preview */}
        <div className="mt-16 relative max-w-md mx-auto">
          <div className="relative mx-auto border-4 border-zinc-800 bg-zinc-950 rounded-[40px] shadow-2xl p-4 sm:p-6 overflow-hidden romantic-glow">
            {/* Camera notch */}
            <div className="w-24 h-4 bg-zinc-800 rounded-full mx-auto mb-4" />

            <div className="text-center mb-5">
              <span className="text-[10px] text-rose-400 font-semibold uppercase tracking-widest">
                Surpresa Especial
              </span>
              <h2 className="text-xl font-bold font-serif italic text-white mt-0.5">
                Isabella & Lucas
              </h2>
            </div>

            {/* Relationship Timer */}
            <div className="mb-5">
              <RelationshipTimer startDate="2023-06-12T20:00:00" />
            </div>

            {/* Music Player */}
            <div className="mb-5">
              <MusicPlayer title="Yellow" artist="Coldplay" />
            </div>

            {/* Sample photo grid */}
            <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600"
                alt="Casal"
                className="w-full h-28 object-cover rounded-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600"
                alt="Momento especial"
                className="w-full h-28 object-cover rounded-xl"
              />
            </div>

            <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80 text-left text-xs text-zinc-300">
              <p className="font-serif italic line-clamp-3">
                &ldquo;Desde o primeiro olhar eu soube que você seria meu porto seguro e a razão pela qual acredito no amor...&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-20 px-4 bg-zinc-950/60 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-semibold text-rose-400 tracking-wider uppercase">
            Simples & Rápido
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Como Criar Seu Presente em 3 Passos
          </h2>
          <p className="text-zinc-400 text-sm mt-3 max-w-xl mx-auto">
            Você não precisa saber nada de programação ou design. Nós cuidamos de tudo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 text-left">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-rose-500/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-base mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-white">Preencha as Informações</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Insira o nome de vocês, a data especial em que começaram a namorar e escreva sua declaração ou carta sincera.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-rose-500/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-base mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-white">Fotos & Trilha Sonora</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Adicione suas fotos favoritas e a música que marcou a história do casal para tocar com um player interativo de vinil.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-rose-500/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-base mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-white">Surpreenda com Link ou QR Code</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Receba o link exclusivo da página na hora ou imprima o QR Code para entregar em uma carta, porta-retrato ou presente físico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="recursos" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-rose-400 tracking-wider uppercase">
            Tudo Incluído
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Cada Detalhe Pensado Para Emocionar
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
            <Clock className="w-8 h-8 text-rose-400 mb-3" />
            <h3 className="text-base font-semibold text-white">Contador em Tempo Real</h3>
            <p className="text-xs text-zinc-400 mt-2">
              Mostra exatamente quantos anos, meses, dias, horas e segundos vocês estão juntos, atualizando a cada segundo.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
            <Music className="w-8 h-8 text-rose-400 mb-3" />
            <h3 className="text-base font-semibold text-white">Trilha Sonora com Vinil Giratório</h3>
            <p className="text-xs text-zinc-400 mt-2">
              A música especial do casal toca enquanto quem recebe navega pelas fotos e lê sua declaração.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
            <ImageIcon className="w-8 h-8 text-rose-400 mb-3" />
            <h3 className="text-base font-semibold text-white">Galeria de Fotos Romântica</h3>
            <p className="text-xs text-zinc-400 mt-2">
              Seus melhores cliques reunidos em uma galeria elegante, com zoom e efeitos de transição fluidos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
            <HelpCircle className="w-8 h-8 text-rose-400 mb-3" />
            <h3 className="text-base font-semibold text-white">Quiz do Casal Divertido</h3>
            <p className="text-xs text-zinc-400 mt-2">
              Perguntas personalizadas para testar o quanto seu amor lembra dos momentos mais marcantes de vocês.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
            <Sparkles className="w-8 h-8 text-rose-400 mb-3" />
            <h3 className="text-base font-semibold text-white">Jogo da Memória com Suas Fotos</h3>
            <p className="text-xs text-zinc-400 mt-2">
              Um minijogo interativo onde os cartões viram fotos de vocês dois para encontrar os pares.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
            <QrCode className="w-8 h-8 text-rose-400 mb-3" />
            <h3 className="text-base font-semibold text-white">QR Code Exclusivo para Presentear</h3>
            <p className="text-xs text-zinc-400 mt-2">
              Baixe a imagem do QR Code em alta resolução para imprimir em canecas, chaveiros, cartas ou caixas de presente.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 px-4 bg-zinc-950/80 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold text-rose-400 tracking-wider uppercase">
            Planos & Preços
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Um Presente Eterno que Cabe no Bolso
          </h2>
          <p className="text-zinc-400 text-sm mt-3">
            Pagamento único. Sem mensalidades. Acesso vitalício.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
            {/* Basic Plan */}
            <div className="p-8 rounded-3xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Plano Básico
                </span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">R$ 19,90</span>
                  <span className="text-xs text-zinc-400">pagamento único</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Ideal para uma surpresa rápida, linda e inesquecível.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    Página vitalícia online
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    Contador de tempo juntos
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    Música especial do casal
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    Galeria com até 4 fotos
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    Carta de amor personalizada
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    QR Code para impressão
                  </li>
                </ul>
              </div>

              <Link
                href="/criar/fazer-eu-mesmo?plano=basic"
                className="mt-8 w-full py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs text-center transition-colors"
              >
                Escolher Plano Básico
              </Link>
            </div>

            {/* VIP Plan */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-rose-950/40 to-zinc-900/90 border-2 border-rose-500/60 flex flex-col justify-between relative shadow-xl shadow-rose-950/40">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                Mais Escolhido 🔥
              </div>

              <div>
                <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                  Plano VIP Completo
                </span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">R$ 34,90</span>
                  <span className="text-xs text-zinc-400">pagamento único</span>
                </div>
                <p className="text-xs text-zinc-300 mt-2">
                  A experiência completa com todos os recursos interativos e jogos.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-zinc-200">
                  <li className="flex items-center gap-2 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                    <strong>Tudo do Plano Básico +</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    Fotos ilimitadas na galeria
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    Linha do Tempo dos Momentos Marcantes
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    Quiz do Casal Interativo
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    Jogo da Memória Personalizado
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    Abertura com Envelope Selado Animado
                  </li>
                </ul>
              </div>

              <Link
                href="/criar/fazer-eu-mesmo?plano=vip"
                className="mt-8 w-full py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-xs text-center shadow-lg shadow-rose-500/25 transition-all transform hover:scale-[1.02]"
              >
                Garantir Experiência VIP
              </Link>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Garantia incondicional de 7 dias: se ela não amar, devolvemos 100% do seu dinheiro.</span>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Pronto Para Fazer Quem Você Ama Chorar de Emoção?
        </h2>
        <p className="mt-4 text-sm text-zinc-400 max-w-lg mx-auto">
          Leva apenas 5 minutos. Comece agora e tenha o presente pronto para entregar hoje mesmo.
        </p>
        <div className="mt-8">
          <Link
            href="/criar/fazer-eu-mesmo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-base shadow-xl shadow-rose-500/30 transition-all transform hover:scale-105 active:scale-95"
          >
            <Heart className="w-4 h-4 fill-white" />
            Criar Minha Página Agora
          </Link>
        </div>
      </section>
    </div>
  );
}
