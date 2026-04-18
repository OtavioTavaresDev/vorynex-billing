# 🚀 Vorynex Billing

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows-blue)](https://github.com/OtavioTavaresDev/vorynex-billing/releases)
[![Platform: Linux](https://img.shields.io/badge/Platform-Linux-success)](https://github.com/OtavioTavaresDev/vorynex-billing/releases)
[![Version: 2.0.0](https://img.shields.io/badge/Version-2.0.0-informational)](https://github.com/OtavioTavaresDev/vorynex-billing/releases)

**Professional billing system and administrative dashboard. Desktop, offline-first, zero external dependencies.**

<p align="center">
  <img src="public/assets/vorynex.png" alt="Vorynex Logo" width="120">
</p>

---

## ✨ Features

- 📊 **Real-time dashboard** with revenue, client, and transaction metrics
- 📈 **Interactive charts** (bar, line, area) with multiple time periods
- 👥 **Client management** (full CRUD)
- 💰 **Transaction management** linked to clients
- 🔐 **Authentication system** with roles (admin/employee)
- 🌙 **Dark/light mode**
- 🌍 **Multi-language** (Portuguese, English, Spanish)
- 💾 **Embedded SQLite database** (zero configuration)
- 🖥️ **Native desktop app** (Electron)
- ⚡ **Offline-first** - works without internet

---

## 📥 Download & Installation

### 🪟 Windows

1. Download the installer `Vorynex Billing Setup 2.0.0.exe` from the [releases page](https://github.com/OtavioTavaresDev/vorynex-billing/releases/latest)
2. Run the installer (double-click)
3. Follow the on-screen instructions
4. The app will be installed and open automatically

### 🐧 Linux (AppImage)

1. Download the `Vorynex Billing-2.0.0.AppImage` file from the [releases page](https://github.com/OtavioTavaresDev/vorynex-billing/releases/latest)
2. Give execution permission:
   ```bash
   chmod +x "Vorynex Billing-2.0.0.AppImage"
Run with double-click or:

bash
./"Vorynex Billing-2.0.0.AppImage"
That's it! The app opens automatically. No Node.js, npm, or dependencies required.

🍎 macOS (coming soon)
macOS build coming soon.

🔑 Demo Access
The demo version has limitations:

3 clients

3 transactions

3 users

Default credentials (first access):

Create your admin account on first access

For unlimited use, purchase the full version.

🛠️ Technologies
Layer	Technology
Frontend	HTML5, TailwindCSS, Chart.js
Backend	Node.js, Express
Desktop	Electron
Database	SQLite (better-sqlite3)
Security	bcryptjs, Helmet, CORS
🏗️ Development
Prerequisites
Node.js 18+

npm

Run locally
bash
git clone https://github.com/OtavioTavaresDev/vorynex-billing.git
cd vorynex-billing
npm install
npm start
Production build
bash
# Linux (AppImage)
npm run build:linux

# Windows (requires Wine on Linux)
npm run build:win

# macOS
npm run build:mac
Installers will be generated in dist/.

📂 Project Structure
text
vorynex-billing/
├── main.js          # Electron + Express integrated
├── package.json
├── public/          # Static frontend
│   ├── index.html   # Login
│   ├── dashboard.html
│   ├── app.js
│   └── assets/      # Images and logos
└── dist/            # Generated installers
🚀 Roadmap
Dashboard with metrics

Client and transaction CRUD

Authentication with roles

Linux build (AppImage)

Windows build (.exe)

macOS build

Licensing system

Exportable reports (PDF/Excel)

PIX integration

📄 License
ISC - Vorynex. Commercial use under proprietary license.

🔗 Links
🌐 Official Website / Store

📦 Releases

🐛 Report Bug

<p align="center"> <strong>Vorynex Billing</strong> — Financial control that fits in your pocket.<br> © 2025 Vorynex. All rights reserved. </p>
