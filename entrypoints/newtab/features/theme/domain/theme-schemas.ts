import { z } from 'zod'

import { COLOR_MODES, PRESET_NAMES } from './theme-constants'

export const presetNameSchema = z.enum(PRESET_NAMES)

export const themeSchema = z.object({
  colorMode: z.enum(COLOR_MODES),
  customAccentChroma: z.number().min(0).max(0.4).optional(),
  customAccentHue: z.number().min(0).max(360).optional(),
  presetName: presetNameSchema
})
