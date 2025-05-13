import { MediaFormatEnum, MediaModelInterface, MediaTypeEnum } from 'contracts'

export function checkProductMediaStructure(media: MediaModelInterface): void {
    expect(media).toHaveProperty('id')
    expect(typeof media.id).toBe('number')
    expect(media).toHaveProperty('url')
    expect(typeof media.url).toBe('string')
    expect(media).toHaveProperty('type')
    expect(typeof media.type).toBe('string')
    expect(Object.values(MediaTypeEnum).includes(media.type as MediaTypeEnum)).toBe(true)
    expect(media).toHaveProperty('format')
    expect(typeof media.format).toBe('string')
    expect(Object.values(MediaFormatEnum).includes(media.format as MediaFormatEnum)).toBe(true)
}