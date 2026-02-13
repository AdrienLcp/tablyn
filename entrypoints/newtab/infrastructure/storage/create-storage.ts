import type { z } from 'zod'

const STORAGE_PREFIX = 'tablyn:'

export const createStorage = <T>(key: string, schema: z.ZodType<T>) => {
  const prefixedKey = `${STORAGE_PREFIX}${key}`

  return {
    load: async (): Promise<T | null> => {
      try {
        const storageResult = await browser.storage.local.get(prefixedKey)
        const parsed = schema.safeParse(storageResult[prefixedKey])

        if (parsed.success) {
          return parsed.data
        }

        console.warn(
          `[Tablyn] Invalid data in storage for key "${prefixedKey}"`
        )
      } catch (storageError) {
        console.warn(
          `[Tablyn] Failed to load from storage for key "${prefixedKey}"`,
          storageError
        )
      }

      return null
    },

    remove: async (): Promise<void> => {
      await browser.storage.local.remove(prefixedKey)
    },

    save: async (value: T): Promise<void> => {
      await browser.storage.local.set({ [prefixedKey]: value })
    }
  }
}
