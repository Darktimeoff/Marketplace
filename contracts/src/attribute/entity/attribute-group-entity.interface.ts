import { BaseEntityInterface } from '@/generic'
import { TranslationEntityInterface } from '@/translation/entity/translation-entity.interface'
import { AttributeEntityInterface } from '@/index'
import { AttributeGroupAssociationEnum } from '@/attribute/enum/attribute-group-association.enum'

export interface AttributeGroupEntityInterface extends BaseEntityInterface {
    slug: string
    nameId: number | null
    order: number

    [AttributeGroupAssociationEnum.ATTRIBUTES]?: AttributeEntityInterface[]
    [AttributeGroupAssociationEnum.NAME]?: TranslationEntityInterface | null
}
