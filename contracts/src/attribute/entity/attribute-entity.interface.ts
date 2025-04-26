import { BaseEntityInterface } from "@/generic";
import { AttributeInterface } from "@/attribute/interface/attribute.interface";
import { AttributeAssociationInterface } from "@/attribute/association/attribute-association.interface";

export interface AttributeEntityInterface extends BaseEntityInterface, AttributeInterface, AttributeAssociationInterface {}
