import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { ThemeContext } from '../theme-context'
import { applyThemeToDOM } from '../theme-css'
import type {
  ColorMode,
  EffectiveMode,
  PresetName,
  Theme
} from '../theme-domain'
import { DEFAULT_THEME_STATE } from '../theme-domain'
import { onSystemModeChange, resolveEffectiveMode } from '../theme-mode'
import { themeStorage } from '../theme-storage'

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME_STATE)
  const [effectiveMode, setEffectiveMode] = useState<EffectiveMode>(() =>
    resolveEffectiveMode(DEFAULT_THEME_STATE.colorMode)
  )
  const [isThemeLoaded, setIsThemeLoaded] = useState(false)
  const themeRef = useRef(theme)

  useEffect(() => {
    themeStorage.load().then((savedTheme) => {
      const resolvedTheme = savedTheme ?? DEFAULT_THEME_STATE
      themeRef.current = resolvedTheme
      setTheme(resolvedTheme)
      const resolvedMode = resolveEffectiveMode(resolvedTheme.colorMode)
      setEffectiveMode(resolvedMode)
      applyThemeToDOM(resolvedTheme, resolvedMode)
      setIsThemeLoaded(true)
    })
  }, [])

  useEffect(() => {
    return onSystemModeChange((systemMode) => {
      if (themeRef.current.colorMode !== 'system') return

      setEffectiveMode(systemMode)
      applyThemeToDOM(themeRef.current, systemMode)
    })
  }, [])

  const updateTheme = useCallback((nextTheme: Theme) => {
    themeRef.current = nextTheme
    setTheme(nextTheme)
    const resolvedMode = resolveEffectiveMode(nextTheme.colorMode)
    setEffectiveMode(resolvedMode)
    applyThemeToDOM(nextTheme, resolvedMode)
    themeStorage.save(nextTheme)
  }, [])

  const setColorMode = useCallback(
    (colorMode: ColorMode) => updateTheme({ ...themeRef.current, colorMode }),
    [updateTheme]
  )

  const setPreset = useCallback(
    (presetName: PresetName) =>
      updateTheme({ ...themeRef.current, presetName }),
    [updateTheme]
  )

  const setCustomAccent = useCallback(
    (hue: number, chroma: number) =>
      updateTheme({
        ...themeRef.current,
        customAccentChroma: chroma,
        customAccentHue: hue
      }),
    [updateTheme]
  )

  const clearCustomAccent = useCallback(
    () =>
      updateTheme({
        ...themeRef.current,
        customAccentChroma: undefined,
        customAccentHue: undefined
      }),
    [updateTheme]
  )

  const resetColorMode = useCallback(
    () =>
      updateTheme({
        ...themeRef.current,
        colorMode: DEFAULT_THEME_STATE.colorMode
      }),
    [updateTheme]
  )

  const resetPreset = useCallback(
    () =>
      updateTheme({
        ...themeRef.current,
        customAccentChroma: undefined,
        customAccentHue: undefined,
        presetName: DEFAULT_THEME_STATE.presetName
      }),
    [updateTheme]
  )

  const resetTheme = useCallback(
    () => updateTheme({ ...DEFAULT_THEME_STATE }),
    [updateTheme]
  )

  const value = useMemo(
    () => ({
      clearCustomAccent,
      colorMode: theme.colorMode,
      effectiveMode,
      presetName: theme.presetName,
      resetColorMode,
      resetPreset,
      resetTheme,
      setColorMode,
      setCustomAccent,
      setPreset
    }),
    [
      clearCustomAccent,
      effectiveMode,
      resetColorMode,
      resetPreset,
      resetTheme,
      setColorMode,
      setCustomAccent,
      setPreset,
      theme.colorMode,
      theme.presetName
    ]
  )

  if (!isThemeLoaded) return null

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
