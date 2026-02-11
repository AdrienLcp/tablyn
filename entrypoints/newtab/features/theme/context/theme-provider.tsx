import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { DEFAULT_THEME_STATE } from '../domain/theme-constants'
import type {
  ColorMode,
  EffectiveMode,
  PresetName,
  Theme
} from '../domain/theme-entities'
import { applyThemeToDOM } from '../services/theme-css'
import { onSystemModeChange, resolveEffectiveMode } from '../services/theme-mode'
import { loadTheme, saveTheme } from '../services/theme-storage'
import { ThemeContext } from './theme-context'

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
    loadTheme().then((savedTheme) => {
      themeRef.current = savedTheme
      setTheme(savedTheme)
      const resolvedMode = resolveEffectiveMode(savedTheme.colorMode)
      setEffectiveMode(resolvedMode)
      applyThemeToDOM(savedTheme, resolvedMode)
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
    saveTheme(nextTheme)
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
