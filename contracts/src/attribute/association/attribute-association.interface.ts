import { TranslationEntityInterface } from "@/translation";
import { AttributeAssociationEnum } from "@/attribute/enum/attribute-association.enum";

export interface AttributeAssociationInterface {
    [AttributeAssociationEnum.NAME]: TranslationEntityInterface;
    [AttributeAssociationEnum.UNIT]: TranslationEntityInterface | null;
}
    