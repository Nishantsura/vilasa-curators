import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function splitWords(text: string): string[] {
  return text.split(' ')
}

export function splitLines(text: string): string[] {
  return text.split('\n')
}

export function toSentenceCase(text: string): string {
  if (!text) return text
  if (text !== text.toUpperCase()) return text
  return text
    .split('\n')
    .map(line => line.charAt(0).toUpperCase() + line.slice(1).toLowerCase())
    .join('\n')
}
