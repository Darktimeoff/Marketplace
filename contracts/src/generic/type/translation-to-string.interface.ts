import { TranslationModelInterface } from '@/translation'

export type TranslatedInterface<T> = T extends TranslationModelInterface
    ? string
    : T extends object
      ? { [K in keyof T]: TranslatedInterface<T[K]> }
      : T
