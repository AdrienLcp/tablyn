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

export const THEME_STORAGE_KEY = 'tablyn:theme'

export const DEFAULT_THEME_STATE = {
  colorMode: 'system',
  presetName: 'zinc'
} as const
