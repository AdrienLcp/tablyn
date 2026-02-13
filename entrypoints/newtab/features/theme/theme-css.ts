import type { EffectiveMode, Theme } from './theme-domain'

const ACCENT_BASE_LIGHTNESS = 0.546
const ACCENT_HOVER_DELTA = 0.1
const ACCENT_PRESS_DELTA = 0.2
const ACCENT_FOREGROUND = 'oklch(0.985 0 0)'

const ACCENT_CSS_VARS = [
  '--color-accent',
  '--color-accent-foreground',
  '--color-accent-hovered',
  '--color-accent-pressed',
  '--color-ring'
] as const

const applyThemeClassToDOM = (
  presetName: string,
  effectiveMode: EffectiveMode
): void => {
  const root = document.documentElement

  const classesToRemove = [...root.classList].filter(
    (cls) => cls.startsWith('theme-') || cls === 'light' || cls === 'dark'
  )
  root.classList.remove(...classesToRemove)

  root.classList.add(`theme-${presetName}`, effectiveMode)
}

const applyCustomAccentToDOM = (
  hue: number,
  chroma: number,
  effectiveMode: EffectiveMode
): void => {
  const rootStyle = document.documentElement.style
  const hoverDelta =
    effectiveMode === 'light' ? -ACCENT_HOVER_DELTA : ACCENT_HOVER_DELTA
  const pressDelta =
    effectiveMode === 'light' ? -ACCENT_PRESS_DELTA : ACCENT_PRESS_DELTA

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

const clearCustomAccentFromDOM = (): void => {
  const rootStyle = document.documentElement.style
  for (const cssVar of ACCENT_CSS_VARS) {
    rootStyle.removeProperty(cssVar)
  }
}

export const applyThemeToDOM = (
  theme: Theme,
  effectiveMode: EffectiveMode
): void => {
  applyThemeClassToDOM(theme.presetName, effectiveMode)

  if (theme.customAccentHue != null && theme.customAccentChroma != null) {
    applyCustomAccentToDOM(
      theme.customAccentHue,
      theme.customAccentChroma,
      effectiveMode
    )
  } else {
    clearCustomAccentFromDOM()
  }
}
