import { useTheme } from '../theme-context'
import {
  COLOR_MODES,
  type ColorMode,
  PRESET_NAMES,
  type PresetName
} from '../theme-domain'

const COLOR_VARS = [
  'accent',
  'accent-foreground',
  'accent-hovered',
  'accent-pressed',
  'background',
  'border',
  'destructive',
  'destructive-foreground',
  'foreground',
  'foreground-muted',
  'muted',
  'ring'
] as const

export const ThemeSwitcher: React.FC = () => {
  const { colorMode, effectiveMode, presetName, setColorMode, setPreset } =
    useTheme()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '32px'
      }}
    >
      <section>
        <h2
          style={{ color: 'var(--color-foreground)', marginBlockEnd: '12px' }}
        >
          Mode: {effectiveMode} ({colorMode})
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          {COLOR_MODES.map((mode) => (
            <button
              key={mode}
              onClick={() => setColorMode(mode as ColorMode)}
              style={{
                background:
                  colorMode === mode
                    ? 'var(--color-accent)'
                    : 'var(--color-muted)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                color:
                  colorMode === mode
                    ? 'var(--color-accent-foreground)'
                    : 'var(--color-foreground)',
                cursor: 'pointer',
                fontWeight: colorMode === mode ? 700 : 400,
                padding: '8px 16px'
              }}
              type='button'
            >
              {mode}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2
          style={{ color: 'var(--color-foreground)', marginBlockEnd: '12px' }}
        >
          Preset: {presetName}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {PRESET_NAMES.map((name) => (
            <button
              key={name}
              onClick={() => setPreset(name as PresetName)}
              style={{
                background:
                  presetName === name
                    ? 'var(--color-accent)'
                    : 'var(--color-muted)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                color:
                  presetName === name
                    ? 'var(--color-accent-foreground)'
                    : 'var(--color-foreground)',
                cursor: 'pointer',
                fontWeight: presetName === name ? 700 : 400,
                padding: '8px 16px'
              }}
              type='button'
            >
              {name}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2
          style={{ color: 'var(--color-foreground)', marginBlockEnd: '12px' }}
        >
          Color palette
        </h2>
        <div
          style={{
            display: 'grid',
            gap: '8px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))'
          }}
        >
          {COLOR_VARS.map((name) => (
            <div
              key={name}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  backgroundColor: `var(--color-${name})`,
                  blockSize: '48px'
                }}
              />
              <span
                style={{
                  color: 'var(--color-foreground-muted)',
                  fontSize: '11px',
                  padding: '6px 8px'
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
