import { Tooltip as AriaTooltip, TooltipTrigger } from 'react-aria-components'

import './tooltip.sass'

type TooltipProps = {
  children: React.ReactElement
  content: React.ReactNode
  delay?: number
  placement?: React.ComponentProps<typeof AriaTooltip>['placement']
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  delay = 700,
  placement
}) => (
  <TooltipTrigger delay={delay}>
    {children}
    <AriaTooltip className='tooltip' placement={placement}>
      {content}
    </AriaTooltip>
  </TooltipTrigger>
)
