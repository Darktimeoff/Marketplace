export enum LanguageLocaleEnum {
    EN = 'en',
    ES = 'es',
    FR = 'fr',
    DE = 'de',
    IT = 'it',
}

export interface TranslationsInterface {
    [key: string]: string
}

export interface TranslateResultDtoInterface {
    sourceLanguage: LanguageLocaleEnum
    sourceText: string
    translatedText: TranslationsInterface
}
