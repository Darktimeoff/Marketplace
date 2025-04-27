import { AttributeGroupAssociationEnum } from '@/attribute/attribute-group/enum/attribute-group-association.enum'
import { TranslationEntityInterface } from '@/translation'
import { AttributeEntityInterface } from '@/attribute/entity/attribute-entity.interface'

export interface AttributeGroupAssociationInterface {
    [AttributeGroupAssociationEnum.NAME]?: TranslationEntityInterface
    [AttributeGroupAssociationEnum.ATTRIBUTES]?: AttributeEntityInterface[]
}
