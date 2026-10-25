"use client";

import { useEffect, useState } from "react";

interface RelationshipTimerProps {
  startDate: string;
}

interface TimeBreakdown {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

export function RelationshipTimer({ startDate }: RelationshipTimerProps) {
  const [time, setTime] = useState<TimeBreakdown | null>(null);

  useEffect(() => {
    function calculate() {
      const start = new Date(startDate);
      const now = new Date();
      const diffMs = Math.max(0, now.getTime() - start.getTime());

      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      // Approximate years and months
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setTime({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours,
        minutes,
        seconds,
        totalDays,
      });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  if (!time) {
    return (
      <div className="flex items-center justify-center p-6 text-zinc-500 text-sm">
        Calculando nosso tempo juntos...
      </div>
    );
  }

  const units = [
    { label: "Anos", value: time.years },
    { label: "Meses", value: time.months },
    { label: "Dias", value: time.days },
    { label: "Horas", value: time.hours },
    { label: "Minutos", value: time.minutes },
    { label: "Segundos", value: time.seconds },
  ];

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 text-center">
        {units.map((u, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-zinc-900/80 border border-rose-500/20 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 shadow-md hover:border-rose-500/40 transition-all"
          >
            <span className="text-xl sm:text-2xl font-bold font-mono text-rose-400">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-medium mt-0.5">
              {u.label}
            </span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-zinc-400 mt-3">
        Total de <span className="text-rose-400 font-semibold">{time.totalDays} dias</span> colecionando momentos incríveis lado a lado ✨
      </p>
    </div>
  );
}
