import { createStorage } from '../storage/create-storage'
import { localeSchema } from './i18n-locale'

export const localeStorage = createStorage('locale', localeSchema)
