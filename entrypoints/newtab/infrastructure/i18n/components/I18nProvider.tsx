import { useCallback, useEffect, useMemo, useState } from 'react'
import { I18nProvider as AriaI18nProvider } from 'react-aria-components'

import { I18nContext } from '../i18n-context'
import {
  DEFAULT_LOCALE,
  detectBrowserLocale,
  type SupportedLocale
} from '../i18n-locale'
import { localeStorage } from '../i18n-storage'
import { initTranslations } from '../i18n-translate'

export const I18nProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [locale, setLocale] = useState<SupportedLocale>(DEFAULT_LOCALE)
  const [isLocaleLoaded, setIsLocaleLoaded] = useState(false)

  useEffect(() => {
    localeStorage.load().then((savedLocale) => {
      const resolvedLocale = savedLocale ?? detectBrowserLocale()
      setLocale(resolvedLocale)
      setIsLocaleLoaded(true)
    })
  }, [])

  const { translate } = useMemo(() => initTranslations(locale), [locale])

  const updateLocale = useCallback((nextLocale: SupportedLocale) => {
    setLocale(nextLocale)
    localeStorage.save(nextLocale)
  }, [])

  const value = useMemo(
    () => ({ locale, setLocale: updateLocale, translate }),
    [locale, updateLocale, translate]
  )

  if (!isLocaleLoaded) return null

  return (
    <I18nContext value={value}>
      <AriaI18nProvider locale={locale}>{children}</AriaI18nProvider>
    </I18nContext>
  )
}
