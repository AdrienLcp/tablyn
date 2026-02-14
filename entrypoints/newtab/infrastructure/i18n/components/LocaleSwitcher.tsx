import { Button } from '../../../presentation/components/Button'
import { useI18n } from '../i18n-context'

export const LocaleSwitcher: React.FC = () => {
  const { locale, setLocale, translate } = useI18n()

  return (
    <div>
      <h2>{translate('locale.title', { locale })}</h2>
      <Button
        onPress={() => setLocale('en')}
        variant={locale === 'en' ? 'filled' : 'outlined'}
      >
        english
      </Button>
      <Button
        onPress={() => setLocale('fr')}
        variant={locale === 'fr' ? 'filled' : 'outlined'}
      >
        français
      </Button>
    </div>
  )
}
