"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, Send, Sparkles, Bot, User, ArrowRight } from "lucide-react";
import { saveDeclaration } from "@/lib/storage";
import { DeclarationData } from "@/types/declaration";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Olá! Eu sou o Cupido IA da MyCupid 💘 Vou te ajudar a criar um presente digital inesquecível em poucos minutos. Para começar: qual é o nome do seu amor?",
    },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);

  // Collected data
  const [partnerName, setPartnerName] = useState("");
  const [yourName, setYourName] = useState("");
  const [startDate, setStartDate] = useState("2023-06-12T20:00");
  const [musicTitle, setMusicTitle] = useState("Yellow - Coldplay");
  const [loveLetter, setLoveLetter] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userText = input.trim();
    setInput("");

    // Add user message
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "user", text: userText }]);

    // Bot processing flow
    setTimeout(async () => {
      if (step === 1) {
        setPartnerName(userText);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: `Que lindo nome! E qual é o seu nome?`,
          },
        ]);
        setStep(2);
      } else if (step === 2) {
        setYourName(userText);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: `Prazer, ${userText}! Em que data vocês começaram a namorar ou tiveram o primeiro encontro inesquecível? (Ex: 12/06/2023)`,
          },
        ]);
        setStep(3);
      } else if (step === 3) {
        setStartDate(userText);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: `Perfeito! O nosso contador em tempo real vai começar dessa data! E qual é a música do casal?`,
          },
        ]);
        setStep(4);
      } else if (step === 4) {
        setMusicTitle(userText);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: `Música maravilhosa! Agora, me diga com suas palavras: qual mensagem ou declaração especial você quer deixar na carta para ${partnerName}?`,
          },
        ]);
        setStep(5);
      } else if (step === 5) {
        setLoveLetter(userText);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: `Emocionante! Estou preparando sua página de amor agora mesmo com o contador, o vinil de música e o envelope selado... ✨`,
          },
        ]);

        setIsGenerating(true);

        const rawSlug = `${partnerName}-e-${yourName}`
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        const uniqueSlug = rawSlug ? `${rawSlug}-${Math.floor(1000 + Math.random() * 9000)}` : `amor-${Date.now().toString().slice(-6)}`;

        const payload: DeclarationData = {
          slug: uniqueSlug,
          partnerName: partnerName || "Meu Amor",
          yourName: yourName || "Eu",
          startDate: "2023-06-12T20:00:00",
          headline: "O melhor capítulo da minha história começou quando você chegou ❤️",
          loveLetter: userText,
          musicTitle: musicTitle || "Yellow",
          musicArtist: "Coldplay",
          youtubeUrl: "https://www.youtube.com/watch?v=yKNxeF4KMsY",
          photos: [
            "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800",
            "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800",
          ],
          timeline: [],
          enableQuiz: false,
          enableMemoryGame: true,
          theme: "rose",
          plan: "vip",
          createdAt: new Date().toISOString(),
        };

        const res = await saveDeclaration(payload);
        setIsGenerating(false);

        if (res.success) {
          setCreatedSlug(res.slug);
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 2).toString(),
              sender: "bot",
              text: `Prontinho! Sua página foi gerada com sucesso! Clique no botão abaixo para ver o resultado ou compartilhar! 🎉`,
            },
          ]);
        }
      }
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
        <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-bold text-white flex items-center gap-1.5">
            Cupido IA <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          </h1>
          <p className="text-xs text-zinc-400">Criando sua declaração de amor passo a passo</p>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 max-w-[85%] ${
              m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                m.sender === "user"
                  ? "bg-rose-500 text-white"
                  : "bg-zinc-800 text-rose-400 border border-zinc-700"
              }`}
            >
              {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Heart className="w-3.5 h-3.5 fill-rose-400" />}
            </div>

            <div
              className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.sender === "user"
                  ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-tr-none"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {createdSlug && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-center space-y-3">
            <p className="text-xs font-semibold text-rose-300">
              Sua página está no ar: /p/{createdSlug}
            </p>
            <button
              onClick={() => router.push(`/p/${createdSlug}`)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-semibold shadow-lg shadow-rose-500/20"
            >
              Ver Minha Página <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!createdSlug && (
        <form onSubmit={handleSend} className="pt-3 border-t border-zinc-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua resposta..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-11 h-11 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-opacity"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      )}
    </div>
  );
}
