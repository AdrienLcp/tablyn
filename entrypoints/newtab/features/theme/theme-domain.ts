import { z } from 'zod'

export const COLOR_MODES = ['dark', 'light', 'system'] as const
export const EFFECTIVE_MODES = ['dark', 'light'] as const

export const PRESET_NAMES = [
  'blue',
  'orange',
  'slate',
  'stone',
  'violet',
  'zinc'
] as const

export const DEFAULT_THEME_STATE = {
  colorMode: 'system',
  presetName: 'zinc'
} as const

export const presetNameSchema = z.enum(PRESET_NAMES)

export const themeSchema = z.object({
  colorMode: z.enum(COLOR_MODES),
  customAccentChroma: z.number().min(0).max(0.4).optional(),
  customAccentHue: z.number().min(0).max(360).optional(),
  presetName: presetNameSchema
})

export type ColorMode = (typeof COLOR_MODES)[number]
export type EffectiveMode = (typeof EFFECTIVE_MODES)[number]
export type PresetName = z.infer<typeof presetNameSchema>

export type Theme = z.infer<typeof themeSchema>
