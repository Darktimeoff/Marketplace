import { TranslationEntityInterface } from "@/translation";
import { AttributeAssociationEnum } from "@/attribute/enum/attribute-association.enum";
import { AttributeGroupEntityInterface } from "@/attribute/attribute-group";
export interface AttributeAssociationInterface {
    [AttributeAssociationEnum.NAME]: TranslationEntityInterface;
    [AttributeAssociationEnum.UNIT]: TranslationEntityInterface | null;
    [AttributeAssociationEnum.ATTRIBUTE_GROUP]: AttributeGroupEntityInterface | null;
}
    