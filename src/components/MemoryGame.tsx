"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, RotateCcw } from "lucide-react";

interface MemoryGameProps {
  photos: string[];
}

interface Card {
  id: number;
  photoUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame({ photos }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    initGame();
  }, [photos]);

  const initGame = () => {
    // Take up to 4 photos for an 8-card grid (mobile friendly)
    const activePhotos = photos.slice(0, 4);
    const cardPairs = [...activePhotos, ...activePhotos]
      .sort(() => Math.random() - 0.5)
      .map((photoUrl, index) => ({
        id: index,
        photoUrl,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(cardPairs);
    setFlippedCards([]);
    setMoves(0);
    setIsCompleted(false);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.photoUrl === secondCard.photoUrl) {
        // Matched!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c))
          );
          setFlippedCards([]);

          // Check if all matched
          const remaining = newCards.filter((c) => !c.isMatched && c.id !== firstId && c.id !== secondId);
          if (remaining.length === 0) {
            setIsCompleted(true);
            confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
          }
        }, 500);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c))
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-zinc-900/90 border border-rose-500/20 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-wider text-rose-400 uppercase bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full">
          Jogo da Memória 🧩
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
          Encontre os Pares de Momentos Especiais
        </h3>
        <p className="text-xs text-zinc-400 mt-1">Tentativas: {moves}</p>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isFlipped || card.isMatched}
            className={`aspect-square rounded-xl border transition-all duration-300 overflow-hidden relative ${
              card.isFlipped || card.isMatched
                ? "border-rose-500 scale-100 shadow-md shadow-rose-500/20"
                : "border-zinc-800 bg-zinc-800/80 hover:border-zinc-700"
            }`}
          >
            {card.isFlipped || card.isMatched ? (
              <img
                src={card.photoUrl}
                alt="Momento especial"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-rose-500/40 text-lg">
                ❤️
              </div>
            )}
          </button>
        ))}
      </div>

      {isCompleted && (
        <div className="text-center mt-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl">
          <p className="text-sm font-semibold text-rose-300">
            Parabéns! Você encontrou todos os nossos momentos em {moves} tentativas! ✨
          </p>
          <button
            onClick={initGame}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
}
