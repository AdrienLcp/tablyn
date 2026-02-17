import classNames from 'classnames'
import { composeRenderProps } from 'react-aria-components'

type ReactAriaClassName<U> =
  | string
  | ((renderProps: U & { defaultClassName: string | undefined }) => string)
  | undefined
type ClassName = Parameters<typeof classNames>[0]

export const composeClassName = <U>(
  className: ReactAriaClassName<U>,
  ...additionalClassNames: ClassName[]
) =>
  composeRenderProps(className, (resolvedClassName: string | undefined) =>
    classNames(...additionalClassNames, resolvedClassName)
  )
