import { LoaderCircle } from 'lucide-react'

import './spinner.sass'

export const Spinner: React.FC = () => (
  <LoaderCircle aria-hidden className='spinner' />
)
