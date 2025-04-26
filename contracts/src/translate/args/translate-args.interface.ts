import { LanguageLocaleEnum } from '@/translate/dto/translate-result-dto.interface'

export interface TranslateArgsInterface {
    sourceLanguage: LanguageLocaleEnum
    targetLanguages: LanguageLocaleEnum[]
    sourceContext?: string
    sourceText: string
}
