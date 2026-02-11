import type { ColorMode, EffectiveMode } from '../domain/theme-entities'

const MEDIA_QUERY = '(prefers-color-scheme: dark)'

export const resolveEffectiveMode = (colorMode: ColorMode): EffectiveMode => {
  if (colorMode === 'system') {
    return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light'
  }
  return colorMode
}

export const onSystemModeChange = (
  callback: (mode: EffectiveMode) => void
): (() => void) => {
  const mql = window.matchMedia(MEDIA_QUERY)

  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light')
  }

  mql.addEventListener('change', handler)
  return () => mql.removeEventListener('change', handler)
}
