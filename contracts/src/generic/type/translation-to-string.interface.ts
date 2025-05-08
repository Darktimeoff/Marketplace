import { TranslationInterface } from '@/translation'

export type TranslatedInterface<T> = T extends TranslationInterface
    ? string
    : T extends object
      ? { [K in keyof T]: TranslatedInterface<T[K]> }
      : T
