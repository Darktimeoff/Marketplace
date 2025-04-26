import { LanguageLocaleEnum } from '@/translation/enum/language-locale.enum'

export interface TranslationInterface {
    value: Record<LanguageLocaleEnum, string>
}
