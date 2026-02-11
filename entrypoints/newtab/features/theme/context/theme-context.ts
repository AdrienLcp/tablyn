import { createContext } from 'react'

import type {
  ColorMode,
  EffectiveMode,
  PresetName
} from '../domain/theme-entities'

export type ThemeContextValue = {
  colorMode: ColorMode
  effectiveMode: EffectiveMode
  presetName: PresetName
  resetColorMode: () => void
  resetPreset: () => void
  resetTheme: () => void
  setColorMode: (mode: ColorMode) => void
  setCustomAccent: (hue: number, chroma: number) => void
  setPreset: (name: PresetName) => void
  clearCustomAccent: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
