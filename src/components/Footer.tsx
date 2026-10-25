import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-4 text-zinc-400 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <span className="text-white font-bold text-lg">MyCupid</span>
          </div>
          <p className="text-xs text-zinc-500 max-w-sm text-center md:text-left">
            Transformando sentimentos em experiências digitais inesquecíveis. Crie, surpreenda e eternize o seu amor.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
          <Link href="/como-funciona" className="hover:text-white transition-colors">
            Como Funciona
          </Link>
          <Link href="/p/demo" className="hover:text-white transition-colors">
            Exemplo Ao Vivo
          </Link>
          <Link href="/termos" className="hover:text-white transition-colors">
            Termos de Uso
          </Link>
          <Link href="/privacidade" className="hover:text-white transition-colors">
            Política de Privacidade
          </Link>
        </div>

        <div className="text-xs text-zinc-600 text-center md:text-right">
          <p>© {new Date().getFullYear()} MyCupid. Todos os direitos reservados.</p>
          <p className="mt-1">Feito com muito ❤️ para casais apaixonados.</p>
        </div>
      </div>
    </footer>
  );
}
