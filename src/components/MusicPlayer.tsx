"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Music, Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  title?: string;
  artist?: string;
  youtubeUrl?: string;
}

export function MusicPlayer({ title = "Nossa Trilha Sonora", artist = "Com Amor", youtubeUrl }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract YouTube ID if valid
  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(youtubeUrl);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-zinc-900/90 border border-rose-500/20 backdrop-blur-md rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4">
      {/* Vinyl record spinning */}
      <div className="relative flex-shrink-0">
        <div
          className={`w-14 h-14 rounded-full bg-zinc-950 border-2 border-zinc-700 shadow-inner flex items-center justify-center transition-transform ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
        >
          {/* Vinyl grooves */}
          <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-rose-500/30 border border-rose-500/60 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-zinc-900"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-0.5">
          <Music className="w-3.5 h-3.5" />
          <span>Música do Casal</span>
        </div>
        <p className="text-sm font-medium text-white truncate">{title}</p>
        <p className="text-xs text-zinc-400 truncate">{artist}</p>
      </div>

      {/* Action button */}
      <button
        onClick={togglePlay}
        className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 transition-transform active:scale-95 flex-shrink-0"
        title={isPlaying ? "Pausar" : "Tocar"}
      >
        {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
      </button>

      {/* Hidden YouTube audio player */}
      {videoId && isPlaying && (
        <div className="hidden">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&enablejsapi=1`}
            allow="autoplay"
            title="Music Player"
          />
        </div>
      )}
    </div>
  );
}
