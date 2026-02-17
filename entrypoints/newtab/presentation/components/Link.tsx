import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps
} from 'react-aria-components'

import { composeClassName } from '../utils/react-aria'
import type { PressableProps } from './pressable'
import { Tooltip } from './Tooltip'

import './pressable.sass'

type LinkProps = PressableProps &
  AriaLinkProps & {
    tooltip?: React.ReactNode
  }

const BaseLink: React.FC<LinkProps> = ({
  children,
  className,
  Icon,
  iconSide = 'left',
  size,
  tooltip,
  variant,
  ...linkRestProps
}) => {
  const isIconOnly = !!Icon && children == null
  const resolvedVariant = variant ?? (isIconOnly ? 'transparent' : undefined)
  const hasIconSide = !!Icon && !isIconOnly

  return (
    <AriaLink
      className={composeClassName(className, 'pressable')}
      data-icon-side={hasIconSide ? iconSide : undefined}
      data-size={size !== 'medium' ? size : undefined}
      data-variant={resolvedVariant}
      {...linkRestProps}
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
            {Icon != null && (
              <span aria-hidden className='icon'>
                {Icon}
              </span>
            )}

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
    </AriaLink>
  )
}

export const Link: React.FC<LinkProps> = ({ tooltip, ...linkRestProps }) => {
  if (tooltip == null) {
    return <BaseLink {...linkRestProps} />
  }

  return (
    <Tooltip content={tooltip}>
      <BaseLink {...linkRestProps} />
    </Tooltip>
  )
}
