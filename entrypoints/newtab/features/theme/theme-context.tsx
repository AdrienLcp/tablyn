import { useCallback, useEffect, useMemo, useState } from 'react'

import { DEFAULT_THEME_STATE } from './domain/theme-constants'
import type {
  ColorMode,
  EffectiveMode,
  PresetName,
  ThemeState
} from './domain/theme-entities'
import {
  applyCustomAccentToDOM,
  applyThemeClassToDOM,
  clearCustomAccentFromDOM
} from './services/theme-css'
import { onSystemModeChange, resolveEffectiveMode } from './services/theme-mode'
import { loadTheme, saveTheme } from './services/theme-storage'
import { ThemeContext } from './theme-definitions'

const applyTheme = (state: ThemeState, effectiveMode: EffectiveMode): void => {
  applyThemeClassToDOM(state.presetName, effectiveMode)

  if (state.customAccentHue != null && state.customAccentChroma != null) {
    applyCustomAccentToDOM(
      state.customAccentHue,
      state.customAccentChroma,
      effectiveMode
    )
  } else {
    clearCustomAccentFromDOM()
  }
}

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [state, setState] = useState<ThemeState>(DEFAULT_THEME_STATE)
  const [effectiveMode, setEffectiveMode] = useState<EffectiveMode>(() =>
    resolveEffectiveMode(DEFAULT_THEME_STATE.colorMode)
  )
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    loadTheme().then((savedThemeState) => {
      setState(savedThemeState)
      const resolvedMode = resolveEffectiveMode(savedThemeState.colorMode)
      setEffectiveMode(resolvedMode)
      applyTheme(savedThemeState, resolvedMode)
      setIsLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (state.colorMode !== 'system') return

    return onSystemModeChange((systemMode) => {
      setEffectiveMode(systemMode)
      applyTheme(state, systemMode)
    })
  }, [state])

  const persist = useCallback((nextState: ThemeState) => {
    setState(nextState)
    const resolvedMode = resolveEffectiveMode(nextState.colorMode)
    setEffectiveMode(resolvedMode)
    applyTheme(nextState, resolvedMode)
    saveTheme(nextState)
  }, [])

  const setColorMode = useCallback(
    (colorMode: ColorMode) => persist({ ...state, colorMode }),
    [persist, state]
  )

  const setPreset = useCallback(
    (presetName: PresetName) => persist({ ...state, presetName }),
    [persist, state]
  )

  const setCustomAccent = useCallback(
    (hue: number, chroma: number) =>
      persist({ ...state, customAccentChroma: chroma, customAccentHue: hue }),
    [persist, state]
  )

  const clearCustomAccent = useCallback(
    () =>
      persist({
        ...state,
        customAccentChroma: undefined,
        customAccentHue: undefined
      }),
    [persist, state]
  )

  const value = useMemo(
    () => ({
      clearCustomAccent,
      colorMode: state.colorMode,
      effectiveMode,
      presetName: state.presetName,
      setColorMode,
      setCustomAccent,
      setPreset
    }),
    [
      clearCustomAccent,
      effectiveMode,
      setColorMode,
      setCustomAccent,
      setPreset,
      state.colorMode,
      state.presetName
    ]
  )

  if (!isLoaded) return null

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
