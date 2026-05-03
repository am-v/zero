
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";



export function SettingsAboutTab() {
  return (
    <div className="space-y-8 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-display mb-2">zero.</h2>
            <p className="text-sm text-muted-foreground">app.info.in</p>

          </div>
        </div>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          A minimal productivity workspace built for deep work and mental clarity — distraction-free, fast, and always within reach.<br /><br />

          <p className="text-sm leading-relaxed">
            Zero is a ground-up port of <strong className="font-medium">Focus Brew</strong>, an open-source productivity suite. The original repository is no longer publicly accessible.
            Zero modernises the entire stack to{" "}
            <strong className="font-medium">Vite + React + TypeScript</strong>, upgraded to{" "}
            <strong className="font-medium">Tailwind CSS v4</strong> and the latest{" "}
            <strong className="font-medium">shadcn/ui</strong>, with all dependency issues resolved and actively kept current.
          </p>
        </div>
        <div className="my-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Tools</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Pomodoro timer", "Kanban board", "Tasks", "Notes",
              "Habit tracker", "Ambient sounds", "YouTube player", "Currency exchange",
            ].map((tool) => (
              <span key={tool} className="text-xs px-2.5 py-1 rounded-md border border-border text-muted-foreground bg-background">
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-5 mt-6 flex flex-wrap gap-6">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-0.5">Built with</p>
            <p className="text-sm">Google Gemini AI on Antigravity</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-0.5">Stack</p>
            <p className="text-sm">Vite · React · TypeScript · Tailwind v4 · shadcn/ui</p>
          </div>

        </div>
      </motion.div>

      <Separator />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-sm text-muted-foreground"
      >
        <p>© 2024 zero • app.info.in</p>
      </motion.div>
    </div>
  );
}
