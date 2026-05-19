'use client'

import { motion } from 'framer-motion'
import { useAudio } from '@/hooks/useAudio'
import { cn } from '@/lib/utils'

export function AudioToggle() {
  const { isPlaying, isReady, toggle } = useAudio('/audio/ambient.mp3')

  if (!isReady) return null

  return (
    <button
      onClick={toggle}
      aria-label={isPlaying ? 'Mute ambient audio' : 'Play ambient audio'}
      className={cn(
        'fixed bottom-8 right-8 z-[300] flex items-center gap-2.5',
        'section-label text-taupe hover:text-espresso transition-colors duration-300',
      )}
    >
      <div className="flex items-end gap-[3px] h-4">
        {[0.4, 1, 0.6, 0.9, 0.5].map((height, i) => (
          <motion.span
            key={i}
            className="w-[2px] bg-current rounded-full"
            animate={
              isPlaying
                ? { scaleY: [height, 1, height * 0.6, 1, height], originY: 1 }
                : { scaleY: 0.3, originY: 1 }
            }
            transition={
              isPlaying
                ? {
                    repeat: Infinity,
                    duration: 1.2,
                    delay: i * 0.12,
                    ease: 'easeInOut',
                  }
                : { duration: 0.4 }
            }
            style={{ height: 16 }}
          />
        ))}
      </div>
      <span>{isPlaying ? 'Sound On' : 'Sound Off'}</span>
    </button>
  )
}
