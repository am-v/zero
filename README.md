# Zero

**Zero** is a modern, all-in-one productivity suite designed to help you find your flow and stay in it. Built with a sleek macOS-inspired desktop interface, it brings together all the tools you need—from Pomodoro timers to ambient sounds—into a single, beautiful workspace.

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vibe Coded](https://img.shields.io/badge/Vibe--Coded-Antigravity-FF69B4?logo=google-gemini&logoColor=white)](https://gemini.google.com/)

---

## ✨ Key Features

### 🖥️ Desktop Environment
- **Window Management**: Fully draggable and resizable application windows.
- **Interactive Dock**: Quick access to your favorite productivity tools.
- **Menu Bar**: System-wide controls and real-time information.
- **Command Palette**: Search and launch anything instantly with `Ctrl+K` (or `Cmd+K`).

### 🛠️ Productivity Modules
- **⏱️ Pomodoro Timer**: Custom intervals with notification support to manage focus sessions.
- **🎵 Ambient Sounds**: A curated selection of high-quality background audio (Rain, Cafe, White Noise, etc.).
- **📋 Kanban Board**: Visual task management with drag-and-drop functionality.
- **✅ Todo App**: Stay on top of your daily tasks with ease.
- **📈 Habit Tracker**: Build and maintain long-term routines with visual progress tracking.
- **📝 Rich Text Notepad**: A powerful editor powered by Tiptap for capturing your thoughts.
- **📺 YouTube Player**: Integrated player with a mini-player mode for focused listening.

### ⚙️ System Features
- **Dynamic Themes**: Multiple curated themes and appearance modes.
- **Exchange Rates**: Real-time currency conversion tool.
- **Responsive Design**: Works beautifully across different screen sizes.

---

## 🚀 Tech Stack

- **Core**: [React 19](https://react.dev/), [TypeScript 6](https://www.typescriptlang.org/), [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) (Animations)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (Primitives), [Lucide](https://lucide.dev/) & [Tabler Icons](https://tabler.io/icons)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Editor**: [Tiptap](https://tiptap.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Drag & Drop**: [@dnd-kit](https://dnd-kit.com/)
- **Media**: [React Player](https://github.com/cookpete/react-player)

---

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/am-v/zero.git
   cd zero
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
src/
├── components/       # UI Components & App Modules
│   ├── apps/         # Individual productivity apps (Todo, Kanban, etc.)
│   ├── ui/           # Reusable Radix-based UI primitives
│   └── ...           # Desktop environment components (Dock, MenuBar)
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and library configurations
├── types/            # TypeScript type definitions
├── App.tsx           # Main application entry point
└── main.tsx          # React hydration and global styles
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<p align="center">
  Entirely vibe-coded using <b>Gemini on Antigravity</b>.
</p>
