export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface DeclarationData {
  id?: string;
  slug: string;
  partnerName: string;
  yourName: string;
  startDate: string; // YYYY-MM-DDTHH:mm or YYYY-MM-DD
  headline?: string;
  loveLetter: string;
  musicTitle?: string;
  musicArtist?: string;
  youtubeUrl?: string; // YouTube video or audio embed
  spotifyUrl?: string;
  photos: string[]; // Base64 or image URLs
  timeline: TimelineEvent[];
  enableQuiz: boolean;
  quizQuestions?: QuizQuestion[];
  enableMemoryGame: boolean;
  memoryPhotos?: string[];
  theme: "rose" | "dark" | "sunset" | "lavender" | "crimson";
  plan: "basic" | "vip";
  createdAt: string;
}
