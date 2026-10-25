"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Heart, 
  Calendar, 
  Music, 
  Image as ImageIcon, 
  Clock, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Copy, 
  Download,
  Share2
} from "lucide-react";
import { DeclarationData, TimelineEvent, QuizQuestion } from "@/types/declaration";
import { saveDeclaration } from "@/lib/storage";
import confetti from "canvas-confetti";

export default function FazerEuMesmoPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form State
  const [partnerName, setPartnerName] = useState("");
  const [yourName, setYourName] = useState("");
  const [startDate, setStartDate] = useState("2023-06-12T20:00");
  const [headline, setHeadline] = useState("O melhor capítulo da minha história começou quando você chegou ❤️");
  const [loveLetter, setLoveLetter] = useState(
    "Meu amor, desde o momento em que te conheci minha vida ganhou um novo sentido. Cada dia ao seu lado é uma dádiva que agradeço todos os dias. Eu te amo infinitamente!"
  );

  // Music
  const [musicTitle, setMusicTitle] = useState("Yellow");
  const [musicArtist, setMusicArtist] = useState("Coldplay");
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/watch?v=yKNxeF4KMsY");

  // Photos
  const [photos, setPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800",
  ]);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  // Timeline
  const [timeline, setTimeline] = useState<TimelineEvent[]>([
    {
      id: "1",
      date: "Primeiro Encontro",
      title: "Onde tudo começou",
      description: "Aquele café e as horas que pareceram segundos conversando sobre tudo.",
    },
    {
      id: "2",
      date: "O Pedido de Namoro",
      title: "O melhor 'Sim' da minha vida",
      description: "O momento em que decidimos caminhar lado a lado para sempre.",
    },
  ]);
  const [newTlDate, setNewTlDate] = useState("");
  const [newTlTitle, setNewTlTitle] = useState("");
  const [newTlDesc, setNewTlDesc] = useState("");

  // Quiz
  const [enableQuiz, setEnableQuiz] = useState(true);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    {
      id: "q1",
      question: "Onde foi o nosso primeiro beijo?",
      options: ["No cinema", "Na praia", "Na praça", "Na festa"],
      correctIndex: 2,
    },
    {
      id: "q2",
      question: "Qual é a nossa comida preferida de pedir?",
      options: ["Pizza", "Hambúrguer", "Sushi", "Açaí"],
      correctIndex: 0,
    },
  ]);

  // Memory Game
  const [enableMemoryGame, setEnableMemoryGame] = useState(true);

  // Theme & Plan
  const [theme, setTheme] = useState<"rose" | "dark" | "sunset" | "lavender" | "crimson">("rose");
  const [plan, setPlan] = useState<"basic" | "vip">("vip");

  // Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 5 * 1024 * 1024) {
        alert("Imagem muito grande (máx 5MB). Tente uma imagem menor.");
        continue;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addPhotoFromUrl = () => {
    if (!newPhotoUrl.trim()) return;
    setPhotos((prev) => [...prev, newPhotoUrl.trim()]);
    setNewPhotoUrl("");
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const addTimelineEvent = () => {
    if (!newTlTitle.trim()) return;
    setTimeline((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        date: newTlDate || "Momento Especial",
        title: newTlTitle,
        description: newTlDesc,
      },
    ]);
    setNewTlDate("");
    setNewTlTitle("");
    setNewTlDesc("");
  };

  const removeTimelineEvent = (id: string) => {
    setTimeline((prev) => prev.filter((t) => t.id !== id));
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    // Generate clean slug from partner and user name
    const rawSlug = `${partnerName}-e-${yourName}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    const uniqueSlug = rawSlug ? `${rawSlug}-${Math.floor(1000 + Math.random() * 9000)}` : `amor-${Date.now().toString().slice(-6)}`;

    const data: DeclarationData = {
      slug: uniqueSlug,
      partnerName: partnerName || "Meu Amor",
      yourName: yourName || "Eu",
      startDate,
      headline,
      loveLetter,
      musicTitle,
      musicArtist,
      youtubeUrl,
      photos,
      timeline,
      enableQuiz,
      quizQuestions: enableQuiz ? quizQuestions : [],
      enableMemoryGame,
      memoryPhotos: photos,
      theme,
      plan,
      createdAt: new Date().toISOString(),
    };

    const res = await saveDeclaration(data);
    setIsSubmitting(false);

    if (res.success) {
      setCreatedSlug(res.slug);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    } else {
      alert("Erro ao criar a página: " + res.error);
    }
  };

  const copyToClipboard = () => {
    if (!createdSlug) return;
    const url = `${window.location.origin}/p/${createdSlug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // SUCCESS / CHECKOUT COMPLETED SCREEN
  if (createdSlug) {
    const fullUrl = typeof window !== "undefined" ? `${window.location.origin}/p/${createdSlug}` : `/p/${createdSlug}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(fullUrl)}&margin=2`;
    const whatsappMsg = `Meu amor, preparei um presente digital inesquecível para você com todas as nossas lembranças! Veja aqui: ${fullUrl}`;

    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-extrabold text-white">
          Sua Página de Amor Está Pronta! 🎉
        </h1>
        <p className="text-zinc-400 text-sm mt-2">
          Agora é só enviar para quem você ama e se preparar para ver a emoção nos olhos dela.
        </p>

        {/* Link box */}
        <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between gap-3 text-left">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-zinc-500 uppercase font-semibold">Link Exclusivo</span>
            <p className="text-sm text-rose-400 font-mono truncate">{fullUrl}</p>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            {copiedLink ? "Copiado!" : "Copiar"}
          </button>
        </div>

        {/* QR Code Card */}
        <div className="mt-8 p-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl max-w-sm mx-auto">
          <h3 className="text-sm font-semibold text-white mb-2">QR Code para Imprimir ou Enviar</h3>
          <p className="text-xs text-zinc-400 mb-4">
            Imprima em uma foto, bilhete ou caneca. Ao apontar a câmera do celular, a página abre na hora!
          </p>
          <div className="bg-white p-3 rounded-2xl inline-block shadow-lg">
            <img src={qrCodeUrl} alt="QR Code do Casal" className="w-48 h-48 mx-auto" />
          </div>
          <div className="mt-4">
            <a
              href={qrCodeUrl}
              target="_blank"
              download="mycupid-qrcode.png"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white px-4 py-2 bg-zinc-800 rounded-full"
            >
              <Download className="w-3.5 h-3.5" /> Baixar Imagem do QR Code
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
          >
            <Share2 className="w-4 h-4" /> Enviar no WhatsApp
          </a>

          <button
            onClick={() => router.push(`/p/${createdSlug}`)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 transition-all"
          >
            <Heart className="w-4 h-4 fill-white" /> Visualizar Meu Presente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Wizard Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
          Passo {step} de 7
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3">
          {step === 1 && "Quem é o Casal e Quando Começou?"}
          {step === 2 && "Qual é a Trilha Sonora do Amor de Vocês?"}
          {step === 3 && "Sua Carta / Declaração de Amor"}
          {step === 4 && "Fotos dos Momentos Inesquecíveis"}
          {step === 5 && "Linha do Tempo dos Momentos Marcantes"}
          {step === 6 && "Jogos Interativos (Quiz & Memória)"}
          {step === 7 && "Escolha do Tema & Finalização"}
        </h1>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-900 h-1.5 rounded-full mb-10 overflow-hidden">
        <div
          className="bg-gradient-to-r from-rose-500 to-pink-500 h-full transition-all duration-300"
          style={{ width: `${(step / 7) * 100}%` }}
        />
      </div>

      {/* STEP 1: Names & Start Date */}
      {step === 1 && (
        <div className="space-y-6 bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 rounded-3xl">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2">
              Nome de quem vai receber o presente ❤️
            </label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Ex: Isabella"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2">
              Seu Nome
            </label>
            <input
              type="text"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              placeholder="Ex: Lucas"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-400" />
              Data e Hora de Início do Relacionamento (Usada no Contador em Tempo Real)
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2">
              Frase de Destaque / Subtítulo
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Ex: O melhor capítulo da minha história começou quando você chegou ❤️"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>
      )}

      {/* STEP 2: Music */}
      {step === 2 && (
        <div className="space-y-6 bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 rounded-3xl">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2 flex items-center gap-1.5">
              <Music className="w-4 h-4 text-rose-400" />
              Nome da Música
            </label>
            <input
              type="text"
              value={musicTitle}
              onChange={(e) => setMusicTitle(e.target.value)}
              placeholder="Ex: Yellow"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2">
              Nome do Artista / Banda
            </label>
            <input
              type="text"
              value={musicArtist}
              onChange={(e) => setMusicArtist(e.target.value)}
              placeholder="Ex: Coldplay"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2">
              Link do Vídeo no YouTube (Para tocar o áudio no vinil interativo)
            </label>
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
            />
            <p className="text-[10px] text-zinc-500 mt-1.5">
              Dica: Copie qualquer link de música do YouTube para tocar na página!
            </p>
          </div>
        </div>
      )}

      {/* STEP 3: Love Letter */}
      {step === 3 && (
        <div className="space-y-6 bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 rounded-3xl">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2">
              Escreva sua Carta de Amor / Declaração
            </label>
            <textarea
              rows={8}
              value={loveLetter}
              onChange={(e) => setLoveLetter(e.target.value)}
              placeholder="Coloque seus sentimentos aqui..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-rose-500 leading-relaxed font-serif"
            />
            <p className="text-[10px] text-zinc-500 mt-1">
              Dica: Seja espontâneo(a), conte como sua vida melhorou e mencione piadas internas de vocês.
            </p>
          </div>
        </div>
      )}

      {/* STEP 4: Photos */}
      {step === 4 && (
        <div className="space-y-6 bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 rounded-3xl">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2">
              Adicionar Fotos da Galeria (Upload ou Link)
            </label>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="Cole o link de uma imagem (https://...)"
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
              />
              <button
                type="button"
                onClick={addPhotoFromUrl}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium"
              >
                Adicionar
              </button>
            </div>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 hover:border-rose-500/50 rounded-2xl p-6 cursor-pointer bg-zinc-950/50 transition-colors">
              <ImageIcon className="w-8 h-8 text-rose-400 mb-2" />
              <span className="text-xs font-medium text-zinc-300">Clique para enviar fotos do seu aparelho</span>
              <span className="text-[10px] text-zinc-500 mt-0.5">PNG, JPG até 5MB</span>
              <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {photos.map((p, idx) => (
                <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-zinc-800">
                  <img src={p} alt="Foto" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removePhoto(idx)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* STEP 5: Timeline */}
      {step === 5 && (
        <div className="space-y-6 bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 rounded-3xl">
          <p className="text-xs text-zinc-400">
            Adicione momentos marcantes do casal (ex: primeiro beijo, primeira viagem, dia em que adotaram um pet).
          </p>

          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
            <input
              type="text"
              value={newTlDate}
              onChange={(e) => setNewTlDate(e.target.value)}
              placeholder="Data (ex: 12 de Junho de 2023)"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
            />
            <input
              type="text"
              value={newTlTitle}
              onChange={(e) => setNewTlTitle(e.target.value)}
              placeholder="Título (ex: Nossa Primeira Viagem)"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
            />
            <textarea
              rows={2}
              value={newTlDesc}
              onChange={(e) => setNewTlDesc(e.target.value)}
              placeholder="Descrição do momento..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
            />
            <button
              type="button"
              onClick={addTimelineEvent}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold hover:bg-rose-500/30"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar à Linha do Tempo
            </button>
          </div>

          <div className="space-y-3 mt-4">
            {timeline.map((item) => (
              <div key={item.id} className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] text-rose-400 font-semibold">{item.date}</span>
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-xs text-zinc-400 mt-1">{item.description}</p>
                </div>
                <button
                  onClick={() => removeTimelineEvent(item.id)}
                  className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 6: Games */}
      {step === 6 && (
        <div className="space-y-6 bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 rounded-3xl">
          <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
            <div>
              <h4 className="text-sm font-semibold text-white">Ativar Quiz do Casal 🤔</h4>
              <p className="text-xs text-zinc-400">Um jogo de perguntas para ver se ela/ele acerta tudo.</p>
            </div>
            <input
              type="checkbox"
              checked={enableQuiz}
              onChange={(e) => setEnableQuiz(e.target.checked)}
              className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
            <div>
              <h4 className="text-sm font-semibold text-white">Ativar Jogo da Memória 🧩</h4>
              <p className="text-xs text-zinc-400">Encontrar os pares com as fotos de vocês.</p>
            </div>
            <input
              type="checkbox"
              checked={enableMemoryGame}
              onChange={(e) => setEnableMemoryGame(e.target.checked)}
              className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* STEP 7: Theme & Finish */}
      {step === 7 && (
        <div className="space-y-6 bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 rounded-3xl">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-3">
              Escolha a Paleta / Tema Visual
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: "rose", name: "Rosa Romântico", color: "from-rose-500 to-pink-500" },
                { id: "crimson", name: "Vermelho Paixão", color: "from-red-600 to-rose-700" },
                { id: "sunset", name: "Pôr do Sol", color: "from-amber-500 to-rose-500" },
                { id: "lavender", name: "Lavanda Suave", color: "from-purple-500 to-indigo-500" },
                { id: "dark", name: "Black Elegance", color: "from-zinc-700 to-zinc-900" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id as any)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    theme === t.id
                      ? "border-rose-500 bg-rose-500/10 shadow-lg shadow-rose-500/10"
                      : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${t.color}`} />
                  <span className="text-xs font-medium text-white">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <label className="block text-xs font-medium text-zinc-300 mb-3">
              Plano Selecionado
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setPlan("basic")}
                className={`p-4 rounded-2xl border cursor-pointer ${
                  plan === "basic" ? "border-rose-500 bg-rose-500/10" : "border-zinc-800 bg-zinc-950"
                }`}
              >
                <span className="text-xs font-semibold text-white">Básico</span>
                <p className="text-lg font-bold text-rose-400 mt-1">R$ 19,90</p>
                <p className="text-[10px] text-zinc-400 mt-1">Página + Música + Contador</p>
              </div>

              <div
                onClick={() => setPlan("vip")}
                className={`p-4 rounded-2xl border cursor-pointer ${
                  plan === "vip" ? "border-rose-500 bg-rose-500/10" : "border-zinc-800 bg-zinc-950"
                }`}
              >
                <span className="text-xs font-semibold text-white">VIP Completo</span>
                <p className="text-lg font-bold text-rose-400 mt-1">R$ 34,90</p>
                <p className="text-[10px] text-zinc-400 mt-1">Todos os Jogos + Linha do Tempo</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar
          </button>
        ) : <div />}

        {step < 7 ? (
          <button
            type="button"
            onClick={() => {
              if (step === 1 && (!partnerName.trim() || !yourName.trim())) {
                alert("Por favor, preencha o nome do casal!");
                return;
              }
              setStep((s) => s + 1);
            }}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-xs shadow-lg shadow-rose-500/20 transition-all"
          >
            Avançar <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-sm shadow-xl shadow-rose-500/30 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {isSubmitting ? "Criando Sua Página..." : "Concluir e Gerar Presente"}
          </button>
        )}
      </div>
    </div>
  );
}
