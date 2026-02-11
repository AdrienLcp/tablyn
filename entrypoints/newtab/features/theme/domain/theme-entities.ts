import type { z } from 'zod'

import type { COLOR_MODES, EFFECTIVE_MODES } from './theme-constants'
import type { presetNameSchema, themeStateSchema } from './theme-schemas'

export type ColorMode = (typeof COLOR_MODES)[number]
export type EffectiveMode = (typeof EFFECTIVE_MODES)[number]
export type PresetName = z.infer<typeof presetNameSchema>

export type ThemeState = z.infer<typeof themeStateSchema>
