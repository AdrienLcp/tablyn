import { z } from 'zod'

export const SUPPORTED_LOCALES = ['en', 'fr'] as const

export const localeSchema = z.enum(SUPPORTED_LOCALES)
export type SupportedLocale = z.infer<typeof localeSchema>
export const DEFAULT_LOCALE: SupportedLocale = 'en'

const matchLocale = (browserLocale: string): SupportedLocale | undefined => {
  const normalizedLocale = browserLocale.toLowerCase()

  const exactMatch = SUPPORTED_LOCALES.find(
    (locale) => locale === normalizedLocale
  )
  if (exactMatch) return exactMatch

  const languagePrefix = normalizedLocale.split('-')[0]
  return SUPPORTED_LOCALES.find((locale) => locale === languagePrefix)
}

export const detectBrowserLocale = (): SupportedLocale => {
  const browserLocales = navigator.languages ?? [navigator.language]

  for (const browserLocale of browserLocales) {
    const matched = matchLocale(browserLocale)
    if (matched) return matched
  }

  return DEFAULT_LOCALE
}
