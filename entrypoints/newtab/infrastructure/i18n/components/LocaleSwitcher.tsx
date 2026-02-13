import { useI18n } from '../i18n-context'

export const LocaleSwitcher: React.FC = () => {
  const { locale, setLocale, translate } = useI18n()

  return (
    <div>
      <h2>{translate('locale.title', { locale })}</h2>
      <button onClick={() => setLocale('en')} type='button'>english</button>
      <button onClick={() => setLocale('fr')} type='button'>français</button>
    </div>
  )
}
