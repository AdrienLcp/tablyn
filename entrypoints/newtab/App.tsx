import { ThemeProvider } from './features/theme/components/ThemeProvider'
import { I18nProvider } from './infrastructure/i18n/components/I18nProvider'
import { DragAndDrop } from './presentation/components/DragAndDrop'

export const App: React.FC = () => (
  <ThemeProvider>
    <I18nProvider>
      <main>
        <DragAndDrop />
      </main>
    </I18nProvider>
  </ThemeProvider>
)
