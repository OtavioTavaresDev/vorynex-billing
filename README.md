# 🚀 Vorynex Billing

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows-blue)](https://github.com/OtavioTavaresDev/vorynex-billing/releases)
[![Platform: Linux](https://img.shields.io/badge/Platform-Linux-success)](https://github.com/OtavioTavaresDev/vorynex-billing/releases)
[![Version: 2.0.0](https://img.shields.io/badge/Version-2.0.0-informational)](https://github.com/OtavioTavaresDev/vorynex-billing/releases)

**Sistema de billing e dashboard administrativo profissional. Desktop, offline-first, sem dependências externas.**

<p align="center">
  <img src="public/assets/vorynex.png" alt="Vorynex Logo" width="120">
</p>

---

## ✨ Funcionalidades

- 📊 **Dashboard em tempo real** com métricas de receita, clientes e transações
- 📈 **Gráficos interativos** (barras, linha, área) com múltiplos períodos
- 👥 **Gestão de clientes** (CRUD completo)
- 💰 **Gestão de transações** vinculadas a clientes
- 🔐 **Sistema de autenticação** com roles (admin/funcionário)
- 🌙 **Modo escuro/claro**
- 🌍 **Multi-idioma** (Português, Inglês, Espanhol)
- 💾 **Banco SQLite embarcado** (zero configuração)
- 🖥️ **App desktop nativo** (Electron)
- ⚡ **Offline-first** - funciona sem internet

---

## 📥 Download e Instalação

### 🪟 Windows

1. Baixe o instalador `Vorynex Billing Setup 2.0.0.exe` da [página de releases](https://github.com/OtavioTavaresDev/vorynex-billing/releases/latest)
2. Execute o instalador (duplo clique)
3. Siga as instruções na tela
4. O app será instalado e abrirá automaticamente

### 🐧 Linux (AppImage)

1. Baixe o arquivo `Vorynex Billing-2.0.0.AppImage` da [página de releases](https://github.com/OtavioTavaresDev/vorynex-billing/releases/latest)
2. Dê permissão de execução:
   ```bash
   chmod +x "Vorynex Billing-2.0.0.AppImage"
Execute com dois cliques ou:

bash
./"Vorynex Billing-2.0.0.AppImage"
Pronto! O app abre automaticamente. Nada de Node.js, npm ou dependências.

🍎 macOS (em breve)
Build para macOS disponível em breve.

🔑 Acesso à Demo
A versão demo possui limitações:

3 clientes

3 transações

3 usuários

Credenciais padrão (primeiro acesso):

Crie sua conta admin no primeiro acesso

Para uso ilimitado, adquira a versão completa.

🛠️ Tecnologias
Camada	Tecnologia
Frontend	HTML5, TailwindCSS, Chart.js
Backend	Node.js, Express
Desktop	Electron
Banco	SQLite (better-sqlite3)
Segurança	bcryptjs, Helmet, CORS
🏗️ Desenvolvimento
Pré-requisitos
Node.js 18+

npm

Rodar localmente
bash
git clone https://github.com/OtavioTavaresDev/vorynex-billing.git
cd vorynex-billing
npm install
npm start
Build para produção
bash
# Linux (AppImage)
npm run build:linux

# Windows (requer Wine no Linux)
npm run build:win

# macOS
npm run build:mac
Os instaladores serão gerados em dist/.

📂 Estrutura do Projeto
text
vorynex-billing/
├── main.js          # Electron + Express integrados
├── package.json
├── public/          # Frontend estático
│   ├── index.html   # Login
│   ├── dashboard.html
│   ├── app.js
│   └── assets/      # Imagens e logos
└── dist/            # Instaladores gerados
🚀 Roadmap
Dashboard com métricas

CRUD de clientes e transações

Autenticação com roles

Build para Linux (AppImage)

Build para Windows (.exe)

Build para macOS

Sistema de licenciamento

Relatórios exportáveis (PDF/Excel)

Integração com PIX

📄 Licença
ISC - Vorynex. Comercialização sob licença própria.

🔗 Links
🌐 Site Oficial / Loja

📦 Releases

🐛 Reportar Bug

<p align="center"> <strong>Vorynex Billing</strong> — Controle financeiro que cabe no seu bolso.<br> © 2025 Vorynex. Todos os direitos reservados. </p>
