'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    audio.addEventListener('canplaythrough', () => setIsReady(true))

    const saved = localStorage.getItem('vilasa-audio')
    if (saved === 'playing') {
      audio.play().then(() => {
        fadeVolume(audio, 0, 0.3, 2000)
        setIsPlaying(true)
      }).catch(() => {})
    }

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [src])

  const fadeVolume = (audio: HTMLAudioElement, from: number, to: number, duration: number) => {
    const steps = 60
    const interval = duration / steps
    const delta = (to - from) / steps
    let current = from
    audio.volume = from

    const timer = setInterval(() => {
      current += delta
      if ((delta > 0 && current >= to) || (delta < 0 && current <= to)) {
        audio.volume = Math.max(0, Math.min(1, to))
        clearInterval(timer)
      } else {
        audio.volume = Math.max(0, Math.min(1, current))
      }
    }, interval)
  }

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      fadeVolume(audio, audio.volume, 0, 1500)
      setTimeout(() => audio.pause(), 1500)
      setIsPlaying(false)
      localStorage.setItem('vilasa-audio', 'paused')
    } else {
      audio.play()
      fadeVolume(audio, 0, 0.3, 2000)
      setIsPlaying(true)
      localStorage.setItem('vilasa-audio', 'playing')
    }
  }, [isPlaying])

  return { isPlaying, isReady, toggle }
}
