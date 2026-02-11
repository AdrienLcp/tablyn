import {
  DEFAULT_THEME_STATE,
  THEME_STORAGE_KEY
} from '../domain/theme-constants'
import type { ThemeState } from '../domain/theme-entities'
import { themeStateSchema } from '../domain/theme-schemas'

export const loadTheme = async (): Promise<ThemeState> => {
  try {
    const storageResult = await browser.storage.local.get(THEME_STORAGE_KEY)
    const rawThemeData = storageResult[THEME_STORAGE_KEY]
    const parsedTheme = themeStateSchema.safeParse(rawThemeData)

    if (parsedTheme.success) {
      return parsedTheme.data
    }

    console.warn('[Tablyn] Invalid theme data in storage, using defaults')
  } catch (storageError) {
    console.warn('[Tablyn] Failed to load theme from storage', storageError)
  }
  return DEFAULT_THEME_STATE
}

export const saveTheme = async (state: ThemeState): Promise<void> => {
  await browser.storage.local.set({ [THEME_STORAGE_KEY]: state })
}
