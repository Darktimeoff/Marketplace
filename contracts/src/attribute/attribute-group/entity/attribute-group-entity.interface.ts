import { BaseEntityInterface } from "@/generic";
import { AttributeGroupInterface } from "@/attribute/attribute-group/interface/attribute-group.interface";
import { AttributeGroupAssociationInterface } from "@/attribute/attribute-group/association/attribute-group-association.interface";

export interface AttributeGroupEntityInterface extends BaseEntityInterface, AttributeGroupInterface, AttributeGroupAssociationInterface {}
