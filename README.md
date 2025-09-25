# Elite Driver - Site de Motorista Executiva Premium

Site profissional desenvolvido com Next.js 15 e as mais modernas tecnologias para serviço de motorista executiva no Brasil.

![Elite Driver](https://img.shields.io/badge/Next.js-15.0.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue)
![React](https://img.shields.io/badge/React-19.0-blue)

## 🚀 Características Principais

### Funcionalidades
- ✅ **Formulário Multi-Step Avançado** com validação em tempo real
- ✅ **Integração WhatsApp Business** para agendamentos
- ✅ **Sistema de Necessidades Especiais** (cadeirante, bagagem extra, pets, etc.)
- ✅ **Suporte Corporativo** com campos para CNPJ e faturamento
- ✅ **Calculadora de Preços** automática baseada em distância
- ✅ **Design Responsivo** otimizado para mobile
- ✅ **Animações Suaves** com Framer Motion
- ✅ **LGPD Compliance** para proteção de dados

### Tecnologias Modernas
- **Next.js 15** com App Router
- **React 19** com Server Components
- **TypeScript** para type safety
- **Tailwind CSS** para estilização
- **Zustand** para gerenciamento de estado
- **React Hook Form + Zod** para formulários
- **Framer Motion** para animações
- **Google Maps API** para localização

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Google Cloud (para Maps API)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/executive-driver.git
cd executive-driver
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas informações:
- Adicione sua chave da API do Google Maps
- Configure o número do WhatsApp
- Ajuste as informações de contato

4. **Execute o projeto em desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🏗️ Estrutura do Projeto

```
executive-driver/
├── src/
│   ├── app/                  # App Router pages
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Home page
│   │   ├── servicos/          # Página de serviços
│   │   ├── sobre/             # Página sobre
│   │   └── agendamento/       # Formulário de agendamento
│   ├── components/            # Componentes React
│   │   ├── Navbar.tsx         # Navegação
│   │   ├── Footer.tsx         # Rodapé
│   │   └── WhatsAppButton.tsx # Botão flutuante WhatsApp
│   ├── lib/                   # Utilitários
│   │   └── utils.ts           # Funções auxiliares
│   ├── store/                 # Estado global
│   │   └── app-store.ts       # Zustand store
│   └── styles/                # Estilos globais
│       └── globals.css        # CSS global + Tailwind
├── public/                    # Arquivos estáticos
├── .env.example              # Exemplo de variáveis de ambiente
├── next.config.js            # Configuração Next.js
├── tailwind.config.ts        # Configuração Tailwind
├── tsconfig.json             # Configuração TypeScript
└── package.json              # Dependências

```

## 🎨 Personalização

### Cores
As cores principais estão definidas em `tailwind.config.ts`:
- **Primária**: `#004862` (Azul escuro)
- **Secundária**: `#c0b09b` (Dourado suave)

Para alterar, edite o arquivo de configuração do Tailwind.

### Fonte
O projeto usa **Poppins** como fonte principal. Para mudar, edite `src/app/layout.tsx`.

### Conteúdo
- **Textos**: Edite diretamente nos componentes
- **Imagens**: Substitua as URLs do Unsplash por suas próprias imagens
- **Informações de contato**: Configure no `.env.local`

## 📱 Funcionalidades Detalhadas

### Formulário de Agendamento
- **Etapa 1**: Dados pessoais e empresariais
- **Etapa 2**: Detalhes da viagem (origem, destino, data)
- **Etapa 3**: Necessidades especiais e observações
- **Etapa 4**: Confirmação e pagamento

### Necessidades Especiais
- ♿ Acessibilidade para cadeirante
- 🧳 Bagagem extra
- 🐕 Pet friendly
- 👶 Cadeirinha infantil

### Integração WhatsApp
O formulário envia automaticamente uma mensagem formatada via WhatsApp com todos os detalhes da reserva.

## 🚀 Deploy

### Vercel (Recomendado)
1. Faça push do código para o GitHub
2. Importe o projeto no [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy automático!

### Outras Plataformas
```bash
# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 🛠️ Desenvolvimento

### Scripts Disponíveis
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Iniciar produção
- `npm run lint` - Verificar código

### Adicionar Novas Páginas
1. Crie uma nova pasta em `src/app/nome-da-pagina/`
2. Adicione um arquivo `page.tsx`
3. A rota será criada automaticamente

### Componentes Reutilizáveis
Todos os componentes estão em `src/components/` e podem ser importados em qualquer página.

## 📋 Checklist de Produção

Antes de ir para produção:
- [ ] Substitua o número do WhatsApp real
- [ ] Configure a API Key do Google Maps
- [ ] Adicione suas próprias imagens
- [ ] Atualize os textos com informações reais
- [ ] Configure Google Analytics (opcional)
- [ ] Teste em diferentes dispositivos
- [ ] Valide formulários com dados reais
- [ ] Configure domínio personalizado
- [ ] Adicione certificado SSL
- [ ] Implemente backup de dados

## 🤝 Suporte

Para dúvidas ou sugestões sobre o projeto, entre em contato.

## 📄 Licença

Este projeto foi desenvolvido para uso comercial específico. Todos os direitos reservados.

## 🙏 Créditos

Desenvolvido com as mais modernas tecnologias e melhores práticas do mercado em 2024/2025.

### Tecnologias Utilizadas
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Google Maps](https://developers.google.com/maps)

---

**Elite Driver** - Excelência em Transporte Executivo 🚗✨
