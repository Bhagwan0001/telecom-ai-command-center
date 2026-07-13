import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Zap className="h-8 w-8 text-primary-foreground" />
        </motion.div>
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-lg font-semibold">TAICC</h2>
          <p className="text-sm text-muted-foreground">Loading Command Center...</p>
        </div>
        <motion.div
          className="h-1 w-32 overflow-hidden rounded-full bg-muted"
        >
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '50%' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center p-8 ${className ?? ''}`}>
      <motion.div
        className="h-8 w-8 rounded-full border-2 border-muted border-t-primary"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
