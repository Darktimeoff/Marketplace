import axios from 'axios'
import * as cheerio from 'cheerio'
import DOMPurify from 'isomorphic-dompurify'

const units = {
    мм: 'mm',
    'мА·год': 'mAh',
    Мп: 'MP',
    ГБ: 'GB',
    ТБ: 'TB',
    Гц: 'Hz',
}

export type CharacteristicsParserType = {
    groupName: string
    attributes: {
        name: string
        unit: string | null
        isDuplicate: boolean
        values: {
            textValue: string | null
            numberValue: number | null
            unit: string | null
        }[]
    }
}

export async function parseCharacteristics(url: string): Promise<CharacteristicsParserType[]> {
    console.log('Запрос характеристик')
    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0',
        },
        timeout: 15000,
    })
    console.log('Характеристики получены')

    const $ = cheerio.load(data)

    const items: CharacteristicsParserType[] = []

    const groupItems = $('.product-tabs__content .group')
    const attributeCount: Record<string, number> = {}

    for (let i = 0; i < groupItems.length; i++) {
        const groupEl = groupItems[i]
        const groupName = $(groupEl).find('.sub-heading').text().trim()

        const attrs = $(groupEl).find('.list .item')
        for (let j = 0; j < attrs.length; j++) {
            const li = attrs[j]

            const nameRaw = $(li).find('.label').text().trim().replace(/:$/, '')
            const valueRaw = [...$(li).find('.value li')].map(el => {
                const isBr = $(el).html()?.includes('<br>')
                if (isBr) {
                    return {
                        textValue: DOMPurify.sanitize($(el).html()?.toString() ?? ''),
                        numberValue: null,
                        unit: null,
                    }
                }

                const value = $(el).text().trim().split(' ')
                const isUnited = value.length == 2
                const unit = isUnited ? value.pop() : null
                const valueNum =
                    isUnited && unit && unit in units
                        ? Number(value[0])
                        : !isUnited && value.length == 1
                          ? Number(value[0])
                          : null
                const isNumber = !Number.isNaN(valueNum) && Boolean(valueNum)
                if (unit && !(unit in units)) {
                    value.push(unit)
                }

                return {
                    numberValue: isNumber ? valueNum : null,
                    textValue: isNumber ? null : value.join(' '),
                    unit: units[unit as keyof typeof units] ?? null,
                }
            })

            if (!nameRaw || !valueRaw) {
                continue
            }

            attributeCount[nameRaw] = (attributeCount[nameRaw] || 0) + 1

            items.push({
                groupName,
                attributes: {
                    name: nameRaw,
                    values: valueRaw,
                    unit: valueRaw.find(v => v.unit)?.unit ?? null,
                    isDuplicate: false,
                },
            })
        }
    }

    return items.map(item => ({
        ...item,
        attributes: {
            ...item.attributes,
            isDuplicate: attributeCount[item.attributes.name] > 1,
        },
    }))
}
