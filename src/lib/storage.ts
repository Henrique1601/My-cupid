import { DeclarationData } from "@/types/declaration";
import { supabase, isSupabaseConfigured } from "./supabase";

const LOCAL_STORAGE_KEY = "mycupid_declarations";

// Demo gift page data when visiting /p/demo
export const DEMO_DECLARATION: DeclarationData = {
  slug: "demo",
  partnerName: "Isabella",
  yourName: "Lucas",
  startDate: "2023-06-12T20:00:00",
  headline: "O melhor capítulo da minha história começou quando você chegou ❤️",
  loveLetter: `Meu amor,

Desde o primeiro olhar, eu soube que você não seria apenas mais uma pessoa na minha vida. Você virou meu porto seguro, meu riso fácil nos dias difíceis e a razão pela qual eu acredito no amor verdadeiro.

Cada momento ao seu lado parece um filme que eu nunca me canso de assistir. Obrigado por ser minha melhor amiga, minha confidente e a dona de todo o meu coração.

Eu te amo hoje, amanhã e para todo o sempre!`,
  musicTitle: "Yellow",
  musicArtist: "Coldplay",
  youtubeUrl: "https://www.youtube.com/watch?v=yKNxeF4KMsY",
  photos: [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800",
  ],
  timeline: [
    {
      id: "1",
      date: "12 de Junho de 2023",
      title: "O Primeiro Beijo",
      description: "Aquele friozinho na barriga na praça, a chuva caindo e a certeza de que nada mais importava.",
    },
    {
      id: "2",
      date: "15 de Outubro de 2023",
      title: "Nossa Primeira Viagem",
      description: "O pôr do sol na praia e as horas conversando sobre nossos sonhos para o futuro.",
    },
    {
      id: "3",
      date: "31 de Dezembro de 2023",
      title: "Ano Novo Juntos",
      description: "Pular as 7 ondas segurando sua mão e agradecendo pelo melhor presente do ano.",
    },
    {
      id: "4",
      date: "Hoje e Sempre",
      title: "Construindo Nossa Vida",
      description: "Mais um dia ao seu lado sendo a pessoa mais feliz do mundo.",
    },
  ],
  enableQuiz: true,
  quizQuestions: [
    {
      id: "q1",
      question: "Onde foi o nosso primeiro beijo?",
      options: ["No cinema", "No parque sob a chuva", "Na praia", "Na casa de amigos"],
      correctIndex: 1,
    },
    {
      id: "q2",
      question: "Qual é a nossa comida favorita de pedir num domingo à noite?",
      options: ["Pizza de quatro queijos", "Hambúrguer artesanal", "Sushi", "Açaí com morango"],
      correctIndex: 0,
    },
    {
      id: "q3",
      question: "Quem disse 'eu te amo' primeiro?",
      options: ["Você", "Eu", "Os dois ao mesmo tempo", "O cachorro"],
      correctIndex: 1,
    },
  ],
  enableMemoryGame: true,
  memoryPhotos: [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=400",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=400",
  ],
  theme: "rose",
  plan: "vip",
  createdAt: new Date().toISOString(),
};

export async function saveDeclaration(data: DeclarationData): Promise<{ success: boolean; slug: string; error?: string }> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("declarations").upsert({
        slug: data.slug,
        partner_name: data.partnerName,
        your_name: data.yourName,
        start_date: data.startDate,
        headline: data.headline,
        love_letter: data.loveLetter,
        music_title: data.musicTitle,
        music_artist: data.musicArtist,
        youtube_url: data.youtubeUrl,
        spotify_url: data.spotifyUrl,
        photos: data.photos,
        timeline: data.timeline,
        enable_quiz: data.enableQuiz,
        quiz_questions: data.quizQuestions,
        enable_memory_game: data.enableMemoryGame,
        memory_photos: data.memoryPhotos,
        theme: data.theme,
        plan: data.plan,
        created_at: data.createdAt,
      });

      if (error) {
        console.warn("Supabase save error, falling back to local storage:", error);
      } else {
        return { success: true, slug: data.slug };
      }
    }

    // Local storage fallback
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const items: Record<string, DeclarationData> = raw ? JSON.parse(raw) : {};
      items[data.slug] = data;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    }

    return { success: true, slug: data.slug };
  } catch (err: any) {
    return { success: false, slug: data.slug, error: err.message };
  }
}

export async function getDeclarationBySlug(slug: string): Promise<DeclarationData | null> {
  if (slug === "demo") {
    return DEMO_DECLARATION;
  }

  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("declarations")
        .select("*")
        .eq("slug", slug)
        .single();

      if (data && !error) {
        return {
          slug: data.slug,
          partnerName: data.partner_name,
          yourName: data.your_name,
          startDate: data.start_date,
          headline: data.headline,
          loveLetter: data.love_letter,
          musicTitle: data.music_title,
          musicArtist: data.music_artist,
          youtubeUrl: data.youtube_url,
          spotifyUrl: data.spotify_url,
          photos: data.photos || [],
          timeline: data.timeline || [],
          enableQuiz: data.enable_quiz ?? false,
          quizQuestions: data.quiz_questions || [],
          enableMemoryGame: data.enable_memory_game ?? false,
          memoryPhotos: data.memory_photos || [],
          theme: data.theme || "rose",
          plan: data.plan || "basic",
          createdAt: data.created_at,
        };
      }
    }

    // Local storage check
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const items = JSON.parse(raw);
        if (items[slug]) return items[slug];
      }
    }

    return null;
  } catch (err) {
    console.error("Error retrieving declaration:", err);
    return null;
  }
}
