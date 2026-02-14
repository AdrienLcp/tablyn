import { Tooltip as AriaTooltip, TooltipTrigger } from 'react-aria-components'

import './tooltip.sass'

type TooltipProps = {
  children: React.ReactElement
  content: React.ReactNode
  delay?: number
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  delay = 700
}) => (
  <TooltipTrigger delay={delay}>
    {children}
    <AriaTooltip className='tooltip'>{content}</AriaTooltip>
  </TooltipTrigger>
)
