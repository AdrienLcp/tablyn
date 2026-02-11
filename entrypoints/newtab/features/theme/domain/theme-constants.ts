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

export const ACCENT_BASE_LIGHTNESS = 0.546
export const ACCENT_HOVER_DELTA = 0.1
export const ACCENT_PRESS_DELTA = 0.2
export const ACCENT_FOREGROUND = 'oklch(0.985 0 0)'

export const DEFAULT_THEME_STATE = {
  colorMode: 'system',
  presetName: 'zinc'
} as const
