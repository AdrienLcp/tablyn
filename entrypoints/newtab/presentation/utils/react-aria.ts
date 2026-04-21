import classNames from 'classnames'
import { composeRenderProps } from 'react-aria-components'

type ClassName = Parameters<typeof classNames>[0]

type ReactAriaClassName<U> =
  | string
  | ((renderProps: U & { defaultClassName: string | undefined }) => string)
  | undefined

export const composeClassName = <U>(
  className: ReactAriaClassName<U>,
  ...additionalClassNames: ClassName[]
) =>
  composeRenderProps(className, (resolvedClassName: string | undefined) =>
    classNames(...additionalClassNames, resolvedClassName)
  )
