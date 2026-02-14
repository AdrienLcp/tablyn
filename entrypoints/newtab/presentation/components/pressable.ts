export const PRESSABLE_VARIANTS = [
  'destructive',
  'filled',
  'outlined',
  'transparent',
  'underlined'
] as const

export const PRESSABLE_SIZES = ['medium', 'small'] as const

export const PRESSABLE_ICON_SIDES = ['left', 'right'] as const

export type PressableVariant = (typeof PRESSABLE_VARIANTS)[number]

export type PressableSize = (typeof PRESSABLE_SIZES)[number]

export type PressableIconSide = (typeof PRESSABLE_ICON_SIDES)[number]

type PressableWithVariantProps = {
  Icon?: React.ReactElement
  iconSide?: PressableIconSide
  size?: PressableSize
  variant: PressableVariant
}

type PressableWithoutVariantProps = {
  Icon?: undefined
  iconSide?: undefined
  size?: undefined
  variant?: undefined
}

export type PressableProps =
  | PressableWithVariantProps
  | PressableWithoutVariantProps
