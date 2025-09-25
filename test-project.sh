#!/bin/bash

echo "🔍 Verificando estrutura do projeto Elite Driver..."
echo "================================================"

# Check if main directories exist
echo "📁 Verificando diretórios principais..."
directories=(
  "src/app"
  "src/components"
  "src/lib"
  "src/store"
  "src/styles"
  "public"
)

for dir in "${directories[@]}"; do
  if [ -d "$dir" ]; then
    echo "✅ $dir existe"
  else
    echo "❌ $dir não encontrado"
  fi
done

echo ""
echo "📄 Verificando arquivos principais..."

# Check if main files exist
files=(
  "package.json"
  "next.config.js"
  "tailwind.config.ts"
  "tsconfig.json"
  ".env.example"
  "README.md"
  "src/app/layout.tsx"
  "src/app/page.tsx"
  "src/app/agendamento/page.tsx"
  "src/app/servicos/page.tsx"
  "src/app/sobre/page.tsx"
  "src/components/Navbar.tsx"
  "src/components/Footer.tsx"
  "src/components/WhatsAppButton.tsx"
  "src/lib/utils.ts"
  "src/store/app-store.ts"
  "src/styles/globals.css"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file existe"
  else
    echo "❌ $file não encontrado"
  fi
done

echo ""
echo "📦 Verificando dependências..."

# Check if node_modules exists
if [ -d "node_modules" ]; then
  echo "✅ node_modules existe"
  echo "   Total de pacotes: $(ls node_modules | wc -l)"
else
  echo "❌ node_modules não encontrado - Execute 'npm install'"
fi

echo ""
echo "🔧 Informações do projeto:"
echo "   Nome: $(grep '"name"' package.json | cut -d'"' -f4)"
echo "   Versão: $(grep '"version"' package.json | cut -d'"' -f4)"
echo "   Next.js: $(grep '"next"' package.json | cut -d'"' -f4)"
echo "   React: $(grep '"react"' package.json | head -1 | cut -d'"' -f4)"

echo ""
echo "✨ Verificação completa!"
echo ""
echo "📝 Para executar o projeto:"
echo "   1. npm install --legacy-peer-deps"
echo "   2. Copie .env.example para .env.local e configure"
echo "   3. npm run dev"
echo ""
echo "🚀 O site estará disponível em http://localhost:3000"
