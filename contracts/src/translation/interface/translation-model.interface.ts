import { BaseModelInterface } from '@/generic'
import { TranslationEntityInterface } from '@/translation/entity/translation-entity.interface'

type TranslationModelFields = 'uk_ua' | 'en_us'

export interface TranslationModelInterface
    extends BaseModelInterface,
        Pick<TranslationEntityInterface, TranslationModelFields> {}
