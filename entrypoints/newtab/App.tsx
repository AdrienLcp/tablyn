import { ThemeSwitcher } from './features/theme/components/ThemeSwitcher'
import { ThemeProvider } from './features/theme/context/theme-provider'

export const App: React.FC = () => (
  <ThemeProvider>
    <main>
      <h1 style={{ color: 'var(--color-foreground)', padding: '32px 32px 0' }}>
        Tablyn
      </h1>
      <ThemeSwitcher />
    </main>
  </ThemeProvider>
)
