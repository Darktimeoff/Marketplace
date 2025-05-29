import { AttributeEntityInterface, TranslationModelInterface, UnitModelInterface } from 'contracts'

export interface DynamicFilterModelInterface extends Pick<AttributeEntityInterface, 'id' | 'slug'> {
    name: TranslationModelInterface
    unit: UnitModelInterface | null
}
