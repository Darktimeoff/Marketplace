import { DBService } from '@/generic/db/db.service'
import { INestApplication } from '@nestjs/common'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { saveAndParseCharacteristics } from './rozetka-characteristics-saver.parser'
import { PrismaClient } from '@/generic/db/generated'

export type ProductParserType = {
    name: string
    price: number
    oldPrice: number | null
    images: string[]
    slug: string
}
export async function parseProduct(url: string): Promise<ProductParserType> {
    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0',
        },
        timeout: 15000,
    })

    const $ = cheerio.load(data)
    const price = $('.product-price__big').html()?.replace('&nbsp;', '').replace('₴', '')
    const oldPrice = $('.product-price__small').html()?.replace('&nbsp;', '').replace('₴', '')

    const product: ProductParserType = {
        name: $('.title__font').text().trim(),
        price: price ? parseFloat(price) : 0,
        oldPrice: oldPrice ? parseFloat(oldPrice) : null,
        images: [
            ...$('.simple-slider__item:not([data-place="mock"]) img')
                .map((i, el) => $(el).attr('src') ?? '')
                .get(),
        ],
        slug: $('[data-test="filter-link"]').attr('href')?.split('/').splice(-3, 1)[0] ?? '',
    }

    return product
}
export async function saveParsedProduct(
    productParser: ProductParserType,
    categoryId: number,
    db: PrismaClient
) {
    const product = await db.product.create({
        data: {
            title: {
                create: {
                    uk_ua: productParser.name,
                },
            },
            slug: productParser.slug,
            price: productParser.price,
            oldPrice: productParser.oldPrice,
            category: {
                connect: {
                    id: categoryId,
                },
            },
        },
    })

    for (let i = 0; i < productParser.images.length; i++) {
        const media = await db.media.create({
            data: {
                url: productParser.images[i],
                type: 'IMAGE',
                format: 'JPEG',
            },
        })

        await db.productMedia.create({
            data: {
                productId: product.id,
                mediaId: media.id,
                order: i,
            },
        })
    }

    return product.id
}

export async function saveAndParseProduct(url: string, categoryId: number, app: INestApplication) {
    const db = app.get(DBService)

    return await db.$transaction(
        async prisma => {
            console.log('Парсим продукт', url)
            const productParser = await parseProduct(url)
            console.log('Продукт парсен', url)
            const productId = await saveParsedProduct(
                productParser,
                categoryId,
                prisma as PrismaClient
            )
            console.log('Продукт сохранен', url)
            await saveAndParseCharacteristics(
                url + 'characteristics/',
                productId,
                categoryId,
                prisma as PrismaClient
            )
            console.log('Характеристики сохранены', url)
            return productId
        },
        { maxWait: 16000, timeout: 16000 }
    )
}
