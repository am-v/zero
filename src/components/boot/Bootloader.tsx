
import { useState, useEffect, useRef } from "react";
import { Panda } from 'lucide-react';
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface BootloaderProps {
  onComplete: () => void;
  minimumDisplayTime?: number;
}

export const Bootloader = ({
  onComplete,
  minimumDisplayTime = 2000,
}: BootloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const completedRef = useRef(false);
  const startTimeRef = useRef(Date.now());

  // Mount state to handle client-side only rendering for theme detection
  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    startTimeRef.current = Date.now();
    completedRef.current = false;
    let frameId: number;

    const animateProgress = () => {
      // Gradually increase progress
      setProgress((prev) => {
        const newProgress = Math.min(prev + 0.7, 100);

        // Check if we've reached 100% and minimum time has passed
        if (newProgress >= 100 && !completedRef.current) {
          completedRef.current = true;
          const elapsedTime = Date.now() - startTimeRef.current;

          // If minimum display time hasn't passed, wait for it
          if (elapsedTime < minimumDisplayTime) {
            setTimeout(() => {
              // Use a separate function to call onComplete to avoid potential issues
              onComplete();
            }, minimumDisplayTime - elapsedTime);
          } else {
            // Use setTimeout to ensure this doesn't happen during rendering
            setTimeout(() => {
              onComplete();
            }, 0);
          }
          return 100;
        }

        return newProgress;
      });

      // Continue animation if not yet complete
      if (!completedRef.current) {
        frameId = requestAnimationFrame(animateProgress);
      }
    };

    // Start the animation in the next frame
    frameId = requestAnimationFrame(animateProgress);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [onComplete, minimumDisplayTime]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative py-4 px-2 mb-4 flex flex-col gap-1 justify-center items-center">
          {mounted && (
            <>
              <Panda size={45} />
            </>
          )}
        </div>

        <div className="w-64 mb-4 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/70 via-blue-500 to-green-500"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ opacity: 0.6, mixBlendMode: "overlay" }}
          />
          <Progress value={progress} className="h-2 bg-muted" />
        </div>

        <motion.p
          className="text-md font-display text-foreground/70 mt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          zero.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
