import {
  DEFAULT_THEME_STATE,
  THEME_STORAGE_KEY
} from '../domain/theme-constants'
import type { Theme } from '../domain/theme-entities'
import { themeSchema } from '../domain/theme-schemas'

export const loadTheme = async (): Promise<Theme> => {
  try {
    const storageResult = await browser.storage.local.get(THEME_STORAGE_KEY)
    const rawThemeData = storageResult[THEME_STORAGE_KEY]
    const parsedTheme = themeSchema.safeParse(rawThemeData)

    if (parsedTheme.success) {
      return parsedTheme.data
    }

    console.warn('[Tablyn] Invalid theme data in storage, using defaults')
  } catch (storageError) {
    console.warn('[Tablyn] Failed to load theme from storage', storageError)
  }
  return DEFAULT_THEME_STATE
}

export const saveTheme = async (state: Theme): Promise<void> => {
  await browser.storage.local.set({ [THEME_STORAGE_KEY]: state })
}
