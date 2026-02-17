import { createStorage } from '../../infrastructure/storage/create-storage'
import { shortcutsSchema } from './shortcuts-domain'

export const shortcutsStorage = createStorage('shortcuts', shortcutsSchema)
