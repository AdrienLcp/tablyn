import { createSafeContext } from '../../infrastructure/react/create-safe-context'
import type { ColorMode, EffectiveMode, PresetName } from './theme-domain'

export type ThemeContextValue = {
  clearCustomAccent: () => void
  colorMode: ColorMode
  effectiveMode: EffectiveMode
  presetName: PresetName
  resetColorMode: () => void
  resetPreset: () => void
  resetTheme: () => void
  setColorMode: (mode: ColorMode) => void
  setCustomAccent: (hue: number, chroma: number) => void
  setPreset: (name: PresetName) => void
}

export const [ThemeContext, useTheme] =
  createSafeContext<ThemeContextValue>('Theme')
