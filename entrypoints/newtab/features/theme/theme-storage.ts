import { createStorage } from '../../infrastructure/storage/create-storage'
import { THEME_STORAGE_KEY, themeSchema } from './theme-domain'

export const themeStorage = createStorage(THEME_STORAGE_KEY, themeSchema)
