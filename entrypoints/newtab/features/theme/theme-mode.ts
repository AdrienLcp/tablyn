import type { ColorMode, EffectiveMode } from './theme-domain'

const PREFERS_DARK_COLOR_SCHEME_MEDIA_QUERY = '(prefers-color-scheme: dark)'

export const resolveEffectiveMode = (colorMode: ColorMode): EffectiveMode => {
  if (colorMode === 'system') {
    return window.matchMedia(PREFERS_DARK_COLOR_SCHEME_MEDIA_QUERY).matches
      ? 'dark'
      : 'light'
  }

  return colorMode
}

export const onSystemModeChange = (
  callback: (mode: EffectiveMode) => void
): (() => void) => {
  const navigatorPrefersDarkColorScheme = window.matchMedia(
    PREFERS_DARK_COLOR_SCHEME_MEDIA_QUERY
  )

  const navigatorPrefersDarkColorSchemeChangeHandler = (
    navigatorPrefersDarkColorSchemeChangeEvent: MediaQueryListEvent
  ) => {
    callback(
      navigatorPrefersDarkColorSchemeChangeEvent.matches ? 'dark' : 'light'
    )
  }

  navigatorPrefersDarkColorScheme.addEventListener(
    'change',
    navigatorPrefersDarkColorSchemeChangeHandler
  )
  return () =>
    navigatorPrefersDarkColorScheme.removeEventListener(
      'change',
      navigatorPrefersDarkColorSchemeChangeHandler
    )
}
