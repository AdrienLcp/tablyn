import { ThemeProvider } from './features/theme/components/ThemeProvider'
import { ThemeSwitcher } from './features/theme/components/ThemeSwitcher'
import { I18nProvider } from './infrastructure/i18n/components/I18nProvider'
import { LocaleSwitcher } from './infrastructure/i18n/components/LocaleSwitcher'
import { Spinner } from './presentation/components/Spinner'

export const App: React.FC = () => (
  <ThemeProvider>
    <I18nProvider>
      <main>
        <ThemeSwitcher />
        <Spinner />
        <LocaleSwitcher />
      </main>
    </I18nProvider>
  </ThemeProvider>
)
