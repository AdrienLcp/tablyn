import { createContext } from 'react'

import type {
  ColorMode,
  EffectiveMode,
  PresetName
} from './domain/theme-entities'

export type ThemeContextValue = {
  clearCustomAccent: () => void
  colorMode: ColorMode
  effectiveMode: EffectiveMode
  presetName: PresetName
  setColorMode: (mode: ColorMode) => void
  setCustomAccent: (hue: number, chroma: number) => void
  setPreset: (name: PresetName) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
