import classNames from 'classnames'
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  composeRenderProps
} from 'react-aria-components'

import type { PressableProps } from './pressable'
import { Spinner } from './Spinner'
import { Tooltip } from './Tooltip'

import './pressable.sass'

type ButtonProps = PressableProps &
  AriaButtonProps & {
    tooltip?: React.ReactNode
  }

const renderIcon = (
  Icon: React.ReactElement | undefined,
  isPending: boolean
) => {
  if (Icon == null) return null

  return (
    <span aria-hidden className='icon'>
      {isPending ? <Spinner /> : Icon}
    </span>
  )
}

const BaseButton: React.FC<ButtonProps> = ({
  children,
  className,
  Icon,
  iconSide = 'left',
  isDisabled,
  isPending,
  size,
  tooltip,
  variant,
  ...buttonRestProps
}) => {
  const isIconOnly = !!Icon && children == null
  const resolvedVariant = variant ?? (isIconOnly ? 'transparent' : undefined)
  const hasIconSide = !!Icon && !isIconOnly

  return (
    <AriaButton
      className={composeRenderProps(className, (className) =>
        classNames('pressable', className)
      )}
      data-icon-side={hasIconSide ? iconSide : undefined}
      data-size={size !== 'medium' ? size : undefined}
      data-variant={resolvedVariant}
      isDisabled={isDisabled || isPending}
      isPending={isPending}
      {...buttonRestProps}
    >
      {(renderProps) =>
        resolvedVariant == null ? (
          typeof children === 'function' ? (
            children(renderProps)
          ) : (
            children
          )
        ) : (
          <>
            {renderIcon(Icon, renderProps.isPending)}

            {children != null && (
              <span className='label'>
                {typeof children === 'function'
                  ? children(renderProps)
                  : children}
              </span>
            )}
          </>
        )
      }
    </AriaButton>
  )
}

export const Button: React.FC<ButtonProps> = ({
  tooltip,
  ...buttonRestProps
}) => {
  if (tooltip == null) {
    return <BaseButton {...buttonRestProps} />
  }

  return (
    <Tooltip content={tooltip}>
      <BaseButton {...buttonRestProps} />
    </Tooltip>
  )
}
