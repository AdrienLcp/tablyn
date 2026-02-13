import { createSafeContext } from '../react/create-safe-context'
import type { SupportedLocale } from './i18n-locale'
import type { initTranslations } from './i18n-translate'

export type TranslateFn = ReturnType<typeof initTranslations>['translate']

export type I18nContextValue = {
  locale: SupportedLocale
  setLocale: (locale: SupportedLocale) => void
  translate: TranslateFn
}

export const [I18nContext, useI18n] =
  createSafeContext<I18nContextValue>('I18n')
