import { createStorage } from '../../infrastructure/storage/create-storage'
import { themeSchema } from './theme-domain'

export const themeStorage = createStorage('theme', themeSchema)
