import { CharacteristicsParserType, parseCharacteristics } from './rozetka-characteristics.parser'
import { slugify } from '@/generic/util/slugify.util'
import { PrismaClient, UnitType } from '@/generic/db/generated'

export async function saveCharacteristics(
    productId: number,
    categoryId: number,
    characteristics: CharacteristicsParserType[],
    db: PrismaClient
) {
    for (let i = 0; i < characteristics.length; i++) {
        const { attributes, groupName } = characteristics[i]
        const group = await findOrCreateGroup(
            {
                name: groupName,
                order: i,
            },
            db
        )

        const nameRaw = attributes.name

        const attribute = await findOrCreateAttribute(
            {
                name: nameRaw,
                unit: attributes.unit,
                order: i,
                groupId: group.id,
                isDuplicate: attributes.isDuplicate,
            },
            db
        )

        await findOrCreateCategoryAttribute(categoryId, attribute.id, db)

        for (let k = 0; k < attributes.values.length; k++) {
            const valueRaw = attributes.values[k]

            await db.productAttributeValue.create({
                data: {
                    product: {
                        connect: {
                            id: productId,
                        },
                    },
                    attribute: {
                        connect: {
                            id: attribute.id,
                        },
                    },
                    order: k,
                    ...(valueRaw.numberValue
                        ? { numberValue: valueRaw.numberValue }
                        : { textValue: { create: { uk_ua: valueRaw.textValue ?? '' } } }),
                },
            })
        }
    }
}

async function findOrCreateCategoryAttribute(
    categoryId: number,
    attributeId: number,
    db: PrismaClient
) {
    const categoryAttribute = await db.categoryAttribute.findFirst({
        where: { categoryId, attributeId },
    })

    if (categoryAttribute) {
        return categoryAttribute
    }

    return await db.categoryAttribute.create({
        data: {
            category: { connect: { id: categoryId } },
            attribute: { connect: { id: attributeId } },
        },
    })
}

async function findOrCreateGroup(
    { name, order }: { name: string; order: number },
    db: PrismaClient
) {
    const group = await db.attributeGroup.findFirst({
        where: {
            slug: slugify(name),
        },
    })

    if (!group) {
        return await db.attributeGroup.create({
            data: {
                ...(name ? { name: { create: { uk_ua: name } } } : {}),
                slug: slugify(name),
                order: order,
            },
        })
    }

    return group
}

async function findOrCreateAttribute(
    {
        name,
        unit,
        order,
        groupId,
        isDuplicate,
    }: {
        name: string
        unit: string | null
        order: number
        groupId: number
        isDuplicate: boolean
    },
    db: PrismaClient
) {
    const attribute = await db.attribute.findFirst({
        where: {
            slug: slugify(name),
        },
    })

    if (attribute && !isDuplicate) {
        return attribute
    }

    return await db.attribute.create({
        data: {
            name: {
                create: {
                    uk_ua: name,
                },
            },
            slug: slugify(name),
            attributeGroup: {
                connect: {
                    id: groupId,
                },
            },
            order: order,
            ...(unit
                ? {
                      unit: {
                          connectOrCreate: {
                              where: { type: unit as UnitType },
                              create: { type: unit as UnitType, uk_ua: unit },
                          },
                      },
                  }
                : {}),
        },
    })
}

export async function saveAndParseCharacteristics(
    url: string,
    productId: number,
    categoryId: number,
    db: PrismaClient
) {
    console.log('Парсим характеристики', url)
    const characteristics = await parseCharacteristics(url)
    console.log('Характеристики парсены', url)
    await saveCharacteristics(productId, categoryId, characteristics, db)
    console.log('Характеристики сохранены', url)
}
