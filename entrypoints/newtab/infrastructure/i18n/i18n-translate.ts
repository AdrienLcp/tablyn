import { dictionaries } from './dictionaries'
import { DEFAULT_LOCALE, type SupportedLocale } from './i18n-locale'
import { initI18n } from './lib'

export const initTranslations = (locale: SupportedLocale) => {
  return initI18n({
    fallbackLocale: DEFAULT_LOCALE,
    locale,
    translations: dictionaries
  })
}
