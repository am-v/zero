
import { motion } from "framer-motion";
import {
  ChevronsUpDown,
  Check,
  ArrowRightLeft,
  Monitor,
  Coins,
  Sun,
  Moon,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { type Theme } from "@/components/theme-provider";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  font: string;
  setFont: (font: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  base: string;
  setBase: (base: string) => void;
  target: string;
  setTarget: (target: string) => void;
  openBase: boolean;
  setOpenBase: (open: boolean) => void;
  openTarget: boolean;
  setOpenTarget: (open: boolean) => void;
  baseSearch: string;
  setBaseSearch: (s: string) => void;
  targetSearch: string;
  setTargetSearch: (s: string) => void;
  filteredBase: string[];
  filteredTarget: string[];
}

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function SettingsAppearanceTab({
  theme,
  setTheme,
  base,
  setBase,
  target,
  setTarget,
  openBase,
  setOpenBase,
  openTarget,
  setOpenTarget,
  baseSearch,
  setBaseSearch,
  targetSearch,
  setTargetSearch,
  filteredBase,
  filteredTarget,
}: Props) {


  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-border/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Monitor className="h-5 w-5 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">Theme</h2>
                <p className="text-sm text-muted-foreground">
                  Switch between light, dark, or system theme.
                </p>
              </div>
            </div>
            <RadioGroup
              value={theme}
              onValueChange={(value) => {
                setTheme(value as Theme);
              }}
              className="flex flex-wrap gap-2"
            >
              {themes.map((t) => {
                const Icon = t.icon;
                return (
                  <Label
                    key={t.value}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors",
                      theme === t.value
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    <RadioGroupItem
                      value={t.value}
                      id={`theme-${t.value}`}
                      className="sr-only"
                    />
                    <Icon className="h-4 w-4" />
                    <span>{t.label}</span>
                  </Label>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>
      </motion.div>



      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="border-border/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Coins className="h-5 w-5 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">Currency</h2>
                <p className="text-sm text-muted-foreground">
                  Choose which currencies to show in the top bar.
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Popover open={openBase} onOpenChange={setOpenBase}>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "w-28 justify-between border rounded-lg px-3 py-2 bg-background text-sm flex items-center transition-colors",
                      !base && "text-muted-foreground",
                      openBase && "border-primary/50",
                      "hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    )}
                    role="combobox"
                    aria-expanded={openBase}
                  >
                    {base ? base.toUpperCase() : "Base..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-36 p-0"
                  align="start"
                  sideOffset={5}
                  side="bottom"
                  forceMount
                >
                  <div className="overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md">
                    <div className="flex items-center border-b px-3">
                      <input
                        value={baseSearch}
                        onChange={(e) => setBaseSearch(e.target.value)}
                        placeholder="Search..."
                        className="flex h-9 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="max-h-[200px] overflow-y-auto p-1">
                      {filteredBase.length === 0 ? (
                        <div className="py-6 text-center text-sm">
                          No currency found.
                        </div>
                      ) : (
                        filteredBase.map((cur) => (
                          <div
                            key={cur}
                            className={cn(
                              "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                              "hover:bg-accent hover:text-accent-foreground",
                              base === cur && "bg-accent text-accent-foreground"
                            )}
                            onClick={() => {
                              setBase(cur);
                              setOpenBase(false);
                              setBaseSearch("");
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                base === cur ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {cur.toUpperCase()}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />

              <Popover open={openTarget} onOpenChange={setOpenTarget}>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "w-28 justify-between border rounded-lg px-3 py-2 bg-background text-sm flex items-center transition-colors",
                      !target && "text-muted-foreground",
                      openTarget && "border-primary/50",
                      "hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    )}
                    role="combobox"
                    aria-expanded={openTarget}
                  >
                    {target ? target.toUpperCase() : "Target..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-36 p-0"
                  align="start"
                  sideOffset={5}
                  side="bottom"
                  forceMount
                >
                  <div className="overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md">
                    <div className="flex items-center border-b px-3">
                      <input
                        value={targetSearch}
                        onChange={(e) => setTargetSearch(e.target.value)}
                        placeholder="Search..."
                        className="flex h-9 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="max-h-[200px] overflow-y-auto p-1">
                      {filteredTarget.length === 0 ? (
                        <div className="py-6 text-center text-sm">
                          No currency found.
                        </div>
                      ) : (
                        filteredTarget.map((cur) => (
                          <div
                            key={cur}
                            className={cn(
                              "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                              "hover:bg-accent hover:text-accent-foreground",
                              target === cur &&
                              "bg-accent text-accent-foreground"
                            )}
                            onClick={() => {
                              setTarget(cur);
                              setOpenTarget(false);
                              setTargetSearch("");
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                target === cur ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {cur.toUpperCase()}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
}
