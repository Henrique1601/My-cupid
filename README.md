# MyCupid Clone - Presente Digital Criativo Para Namorados ❤️

Recriação completa e moderna da plataforma **MyCupid** (`mycupid.com.br`) utilizando **Next.js 15 (App Router)**, **Tailwind CSS**, **Framer Motion**, **TypeScript** e suporte nativo ao **Supabase**.

---

## ✨ Funcionalidades Replicadas

1. **Abertura Emocionante com Envelope Selado:**
   - Efeito visual de envelope com selo de cera que se abre interativamente com confetes.

2. **Contador em Tempo Real:**
   - Cálculo automático e atualização a cada segundo de anos, meses, dias, horas, minutos e segundos juntos.

3. **Trilha Sonora Integrada:**
   - Disco de vinil giratório com player interativo conectado a vídeos/áudios do YouTube.

4. **Galeria de Fotos Romântica:**
   - Suporte a upload local de fotos e links de imagem com visualização elegante.

5. **Linha do Tempo dos Momentos Marcantes:**
   - Registro de datas e histórias do casal (primeiro beijo, viagens, momentos especiais).

6. **Quiz do Casal:**
   - Jogo de perguntas e respostas com pontuação e confetes.

7. **Jogo da Memória Personalizado:**
   - Minijogo onde os cartões viram as próprias fotos do casal para encontrar os pares.

8. **Cupido IA (`/chat`):**
   - Assistente virtual interativo que conversa com o usuário e gera a página de amor automaticamente.

9. **Gerador de QR Code Exclusivo:**
   - Download imediato de QR Code em alta resolução para imprimir em canecas, fotos ou cartas físicas.

10. **Armazenamento Híbrido (Supabase + LocalStorage):**
    - Funciona 100% offline via LocalStorage imediatamente sem precisar configurar nada.
    - Suporta integração direta com Supabase adicionando as variáveis no `.env`.

---

## 🚀 Como Executar

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar o servidor de desenvolvimento
```bash
npm run dev
```
Acesse no navegador: `http://localhost:3000`

### 3. Rotas Disponíveis
- `/` - Landing Page completa
- `/chat` - Criação guiada com o Cupido IA
- `/criar` - Seleção de modalidade de criação
- `/criar/fazer-eu-mesmo` - Criador / Wizard completo com todas as etapas
- `/p/demo` - Página de exemplo do presente ao vivo
- `/p/[slug]` - Página do presente gerada dinamicamente
- `/como-funciona` - Como funciona o produto
- `/termos` - Termos de uso
- `/privacidade` - Política de privacidade

---

## 🗄️ Configuração do Banco de Dados (Supabase - Opcional)

Se desejar persistir os presentes em uma base de dados na nuvem:
1. Copie `.env.example` para `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```
2. Execute o script contido em `supabase/schema.sql` no SQL Editor do seu projeto Supabase.
