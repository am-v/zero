import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // vendor-media (react-player + dashjs + hls.js) is ~2MB but only loaded
    // lazily when the user opens the YouTube Player window — set limit high enough
    // to avoid false-positive warnings on intentionally large lazy chunks.
    chunkSizeWarningLimit: 2200,
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        // dashjs ships a CJS-compat shim inside its ESM bundle; the `exports`
        // global reference is harmless when using the YouTube iframe API only.
        if (
          warning.code === 'COMMONJS_VARIABLE_IN_ESM' &&
          warning.id?.includes('dashjs')
        ) {
          return;
        }
        // Suppress the noisy "ineffective dynamic import" warning for
        // ambient-sounds (it's a known side-effect of re-exporting stopAllAmbientSounds).
        if (
          warning.code === 'INEFFECTIVE_DYNAMIC_IMPORT' &&
          warning.message?.includes('ambient-sounds')
        ) {
          return;
        }
        defaultHandler(warning);
      },
      output: {
        manualChunks: (id) => {
          // ── React core ───────────────────────────────────────────────────
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'vendor-react';
          }
          // ── Animation ────────────────────────────────────────────────────
          if (
            id.includes('node_modules/framer-motion') ||
            id.includes('node_modules/motion-dom') ||
            id.includes('node_modules/motion-utils')
          ) {
            return 'vendor-framer-motion';
          }
          // ── UI primitives ─────────────────────────────────────────────────
          if (id.includes('node_modules/@radix-ui')) {
            return 'vendor-radix';
          }
          // ── Icons (split to avoid one giant chunk) ────────────────────────
          if (id.includes('node_modules/@tabler/icons-react')) {
            return 'vendor-tabler-icons';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide-icons';
          }
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-react-icons';
          }
          // ── Rich text editor ──────────────────────────────────────────────
          if (
            id.includes('node_modules/@tiptap') ||
            id.includes('node_modules/prosemirror')
          ) {
            return 'vendor-tiptap';
          }
          // ── Media (lazy – only loaded when YouTube window opens) ───────────
          if (
            id.includes('node_modules/react-player') ||
            id.includes('node_modules/dashjs') ||
            id.includes('node_modules/hls.js') ||
            id.includes('node_modules/media-chrome') ||
            id.includes('node_modules/@mux')
          ) {
            return 'vendor-media';
          }
          // ── Drag & drop ───────────────────────────────────────────────────
          if (id.includes('node_modules/@dnd-kit')) {
            return 'vendor-dnd';
          }
          // ── Charts ────────────────────────────────────────────────────────
          if (
            id.includes('node_modules/recharts') ||
            id.includes('node_modules/d3') ||
            id.includes('node_modules/victory')
          ) {
            return 'vendor-charts';
          }
          // ── Routing ───────────────────────────────────────────────────────
          if (
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/@remix-run')
          ) {
            return 'vendor-router';
          }
          // ── Date utilities ────────────────────────────────────────────────
          if (
            id.includes('node_modules/date-fns') ||
            id.includes('node_modules/react-day-picker')
          ) {
            return 'vendor-date';
          }
          // ── Misc utilities ────────────────────────────────────────────────
          if (id.includes('node_modules/zod')) return 'vendor-zod';
          if (id.includes('node_modules/zustand')) return 'vendor-zustand';
          if (id.includes('node_modules/lodash')) return 'vendor-lodash';
          // ── Everything else in node_modules ───────────────────────────────
          if (id.includes('node_modules')) return 'vendor-misc';
        },
      },
    },
  },
})
