import ReactDOM from 'react-dom/client'

import { App } from './App'

import './presentation/styles/main.sass'

const root = document.getElementById('root')

if (root) {
  ReactDOM.createRoot(root).render(<App />)
}
