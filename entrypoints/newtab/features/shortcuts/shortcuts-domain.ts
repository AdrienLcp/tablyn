import { z } from 'zod'

export const SHORTCUT_THUMBNAIL_DISPLAYS = ['letter', 'image'] as const
export const thumbnailDisplayInputSchema = z.enum(SHORTCUT_THUMBNAIL_DISPLAYS)
export type ThumbnailDisplay = z.infer<typeof thumbnailDisplayInputSchema>
export const DEFAULT_SHORTCUT_THUMBNAIL_DISPLAY: ThumbnailDisplay = 'letter'

export const shortcutThumbnailBackgroundColorSchema = z
  .string()
  .regex(/^#[\da-f]{6}$/i)
  .nullable()

export const shortcutThumbnailImageUrlSchema = z.url().nullable()
export const shortcutThumbnailLetterSchema = z.string().nullable()

export const shortcutIdSchema = z.string()
export const shortcutNameSchema = z.string().nullable()
export const shortcutPositionSchema = z.number().int().min(0)
export const shortcutUrlSchema = z.url()

export const shortcutThumbnailInputSchema = z.object({
  backgroundColor: shortcutThumbnailBackgroundColorSchema,
  display: thumbnailDisplayInputSchema,
  imageUrl: shortcutThumbnailImageUrlSchema,
  letter: shortcutThumbnailLetterSchema
})

export const shortcutInputSchema = z.object({
  name: shortcutNameSchema,
  shouldOpenInNewTab: z.boolean(),
  thumbnail: shortcutThumbnailInputSchema,
  url: shortcutUrlSchema
})

export const shortcutThumbnailSchema = z.object({
  backgroundColor: shortcutThumbnailBackgroundColorSchema.catch(null),
  display: thumbnailDisplayInputSchema.catch(DEFAULT_SHORTCUT_THUMBNAIL_DISPLAY),
  imageUrl: shortcutThumbnailImageUrlSchema.catch(null),
  letter: shortcutThumbnailLetterSchema.catch(null)
})

export const shortcutSchema = z.object({
  id: shortcutIdSchema.catch(() => crypto.randomUUID()),
  isVisible: z.boolean().catch(true),
  name: shortcutNameSchema.catch(null),
  position: shortcutPositionSchema.catch(0),
  shouldOpenInNewTab: z.boolean().catch(false),
  thumbnail: shortcutThumbnailSchema,
  url: shortcutUrlSchema
})

export const shortcutsImportSchema = z
  .array(z.unknown())
  .catch([])
  .transform((items) =>
    items.flatMap((item) => {
      const parsed = shortcutSchema.safeParse(item)
      if (!parsed.success) {
        console.warn('[Tablyn] Skipped invalid shortcut during parsing', item)
        return []
      }
      return [parsed.data]
    })
  )

export type ShortcutThumbnailInput = z.infer<typeof shortcutThumbnailInputSchema>
export type ShortcutInput = z.infer<typeof shortcutInputSchema>
export type ShortcutThumbnail = z.infer<typeof shortcutThumbnailSchema>
export type Shortcut = z.infer<typeof shortcutSchema>

export const DEFAULT_SHORTCUT_THUMBNAIL: ShortcutThumbnail = {
  backgroundColor: null,
  display: DEFAULT_SHORTCUT_THUMBNAIL_DISPLAY,
  imageUrl: null,
  letter: null
}
