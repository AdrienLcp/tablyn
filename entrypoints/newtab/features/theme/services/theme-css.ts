import {
  ACCENT_BASE_LIGHTNESS,
  ACCENT_FOREGROUND,
  ACCENT_HOVER_DELTA,
  ACCENT_PRESS_DELTA
} from '../domain/theme-constants'
import type { EffectiveMode } from '../domain/theme-entities'

const ACCENT_CSS_VARS = [
  '--color-accent',
  '--color-accent-foreground',
  '--color-accent-hovered',
  '--color-accent-pressed',
  '--color-ring'
] as const

export const applyThemeClassToDOM = (
  presetName: string,
  mode: EffectiveMode
): void => {
  const root = document.documentElement

  const classesToRemove = [...root.classList].filter(
    (cls) => cls.startsWith('theme-') || cls === 'light' || cls === 'dark'
  )
  root.classList.remove(...classesToRemove)

  root.classList.add(`theme-${presetName}`, mode)
}

export const applyCustomAccentToDOM = (
  hue: number,
  chroma: number,
  mode: EffectiveMode
): void => {
  const rootStyle = document.documentElement.style
  const hoverDelta = mode === 'light' ? -ACCENT_HOVER_DELTA : ACCENT_HOVER_DELTA
  const pressDelta = mode === 'light' ? -ACCENT_PRESS_DELTA : ACCENT_PRESS_DELTA

  rootStyle.setProperty(
    '--color-accent',
    `oklch(${ACCENT_BASE_LIGHTNESS} ${chroma} ${hue})`
  )
  rootStyle.setProperty('--color-accent-foreground', ACCENT_FOREGROUND)
  rootStyle.setProperty(
    '--color-accent-hovered',
    `oklch(${ACCENT_BASE_LIGHTNESS + hoverDelta} ${chroma} ${hue})`
  )
  rootStyle.setProperty(
    '--color-accent-pressed',
    `oklch(${ACCENT_BASE_LIGHTNESS + pressDelta} ${chroma} ${hue})`
  )
  rootStyle.setProperty(
    '--color-ring',
    `oklch(${ACCENT_BASE_LIGHTNESS} ${chroma} ${hue})`
  )
}

export const clearCustomAccentFromDOM = (): void => {
  const rootStyle = document.documentElement.style
  for (const cssVar of ACCENT_CSS_VARS) {
    rootStyle.removeProperty(cssVar)
  }
}
