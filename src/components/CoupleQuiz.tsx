"use client";

import { useState } from "react";
import { QuizQuestion } from "@/types/declaration";
import { CheckCircle2, XCircle, Trophy, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface CoupleQuizProps {
  questions: QuizQuestion[];
}

export function CoupleQuiz({ questions }: CoupleQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    }

    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
        confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
      }
    }, 1200);
  };

  const restart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-zinc-900/90 border border-rose-500/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-wider text-rose-400 uppercase bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full">
          Quiz do Casal 🤔
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
          O Quanto Você Conhece a Nossa História?
        </h3>
      </div>

      {!isFinished ? (
        <div>
          <div className="flex justify-between items-center text-xs text-zinc-400 mb-3">
            <span>Pergunta {currentIdx + 1} de {questions.length}</span>
            <span>Pontos: {score}</span>
          </div>

          <div className="w-full bg-zinc-800 h-1.5 rounded-full mb-6 overflow-hidden">
            <div
              className="bg-rose-500 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          <p className="text-base sm:text-lg font-medium text-white mb-6 text-center">
            {currentQ.question}
          </p>

          <div className="flex flex-col gap-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;
              let btnStyle = "bg-zinc-800/80 hover:bg-zinc-700/80 border-zinc-700 text-zinc-200";

              if (selectedOption !== null) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-900/60 border-emerald-500 text-emerald-200";
                } else if (isSelected) {
                  btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {selectedOption !== null && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                  {selectedOption !== null && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 mx-auto flex items-center justify-center text-rose-400 mb-4">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-bold text-white mb-2">
            Resultado: {score} de {questions.length} acertos!
          </h4>
          <p className="text-sm text-zinc-300 max-w-sm mx-auto mb-6">
            {score === questions.length
              ? "Perfeito! Você lembra de cada detalhe da nossa história de amor. Te amo demais! ❤️"
              : score > questions.length / 2
              ? "Muito bem! O amor está nos pequenos momentos que compartilhamos. 🥰"
              : "Valeu a tentativa! O importante é continuarmos criando memórias juntos todos os dias! 💕"}
          </p>
          <button
            onClick={restart}
            className="text-xs font-semibold px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
          >
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
}
