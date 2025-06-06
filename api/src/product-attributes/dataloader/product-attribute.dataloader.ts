import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'
import {
    AttributeAssociationEnum,
    AttributeGroupAssociationEnum,
    ProductAttributeValuesAssociationEnum,
    ProductAttributesGroupedModelInterface,
    ProductAttributesWithoutGroupingModelInterface,
} from 'contracts'

@Injectable()
export class ProductAttributeDataloader {
    constructor(private readonly db: DBService) {}

    async findByProductIdWithoutGroupingAndTake(
        productId: number,
        take: number = 5
    ): Promise<ProductAttributesWithoutGroupingModelInterface[]> {
        const productAttributes = await this.db.attribute.findMany({
            where: {
                [AttributeAssociationEnum.PRODUCT_ATTRIBUTE_VALUES]: {
                    some: {
                        productId,
                    },
                },
            },
            select: {
                id: true,
                [AttributeAssociationEnum.NAME]: {
                    omit: this.db.getDefaultOmit(),
                },
                [AttributeAssociationEnum.UNIT]: {
                    omit: this.db.getDefaultOmit(),
                },
                [AttributeAssociationEnum.PRODUCT_ATTRIBUTE_VALUES]: {
                    where: {
                        productId,
                    },
                    orderBy: {
                        order: 'asc',
                    },
                    select: {
                        numberValue: true,
                        [ProductAttributeValuesAssociationEnum.TEXT_VALUE]: {
                            omit: this.db.getDefaultOmit(),
                        },
                    },
                },
            },
            orderBy: {
                order: 'asc',
            },
            take,
        })

        const productAttributesWithoutGrouping = productAttributes.map(productAttribute => {
            return {
                ...productAttribute,
                productAttributeValues: productAttribute.productAttributeValues.map(
                    productAttributeValue => {
                        return {
                            ...productAttributeValue,
                            numberValue: productAttributeValue.numberValue?.toNumber() ?? null,
                        }
                    }
                ),
            }
        })

        return productAttributesWithoutGrouping
    }

    async findByProductIdGrouped(
        productId: number
    ): Promise<ProductAttributesGroupedModelInterface[]> {
        const productAttributes = await this.db.attributeGroup.findMany({
            where: {
                [AttributeGroupAssociationEnum.ATTRIBUTES]: {
                    some: {
                        [AttributeAssociationEnum.PRODUCT_ATTRIBUTE_VALUES]: {
                            some: {
                                productId,
                            },
                        },
                    },
                },
            },
            select: {
                id: true,
                [AttributeGroupAssociationEnum.NAME]: {
                    omit: this.db.getDefaultOmit(),
                },
                [AttributeGroupAssociationEnum.ATTRIBUTES]: {
                    where: {
                        [AttributeAssociationEnum.PRODUCT_ATTRIBUTE_VALUES]: {
                            some: {
                                productId,
                            },
                        },
                    },
                    select: {
                        id: true,
                        [AttributeAssociationEnum.NAME]: {
                            omit: this.db.getDefaultOmit(),
                        },
                        [AttributeAssociationEnum.UNIT]: {
                            omit: this.db.getDefaultOmit(),
                        },
                        [AttributeAssociationEnum.PRODUCT_ATTRIBUTE_VALUES]: {
                            where: {
                                productId,
                            },
                            orderBy: {
                                order: 'asc',
                            },
                            select: {
                                numberValue: true,
                                [ProductAttributeValuesAssociationEnum.TEXT_VALUE]: {
                                    omit: this.db.getDefaultOmit(),
                                },
                            },
                        },
                    },
                    orderBy: {
                        order: 'asc',
                    },
                },
            },
            orderBy: {
                order: 'asc',
            },
        })

        return productAttributes.map(productAttribute => {
            return {
                ...productAttribute,
                attributes: productAttribute.attributes.map(attribute => {
                    return {
                        ...attribute,
                        productAttributeValues: attribute.productAttributeValues.map(
                            productAttributeValue => {
                                return {
                                    ...productAttributeValue,
                                    numberValue:
                                        productAttributeValue.numberValue?.toNumber() ?? null,
                                }
                            }
                        ),
                    }
                }),
            }
        })
    }
}
