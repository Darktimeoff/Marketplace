import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'
import { isPositiveNumber } from '@rnw-community/shared'

interface FilterValue {
    id: number
    name: string | null
    count: number
}

interface Filter {
    name: string
    slug: string
    values: FilterValue[] | { min: number; max: number }
}

@Injectable()
export class CatalogCategoryFilterDataloaderService {
    constructor(private readonly db: DBService) {}

    async getFiltersByCategoryId(categoryIds: number[]): Promise<Filter[]> {
        const [sellerFilter, brandFilter, priceFilter] = await Promise.all([
            this.getSellerFilter(categoryIds),
            this.getBrandFilter(categoryIds),
            this.getPriceFilter(categoryIds),
        ])
        return [sellerFilter, brandFilter, priceFilter]
    }

    private async getSellerFilter(categoryIds: number[]): Promise<Filter> {
        const sellerCounts = await this.db.product.groupBy({
            where: { categoryId: { in: categoryIds } },
            by: ['sellerId'],
            _count: { _all: true },
        })
        const sellerIds = sellerCounts
            .filter(sc => isPositiveNumber(sc.sellerId))
            .map(sc => sc.sellerId)
        const sellers =
            sellerIds.length > 0
                ? await this.db.seller.findMany({
                      where: { id: { in: sellerIds } },
                      select: { id: true, name: true },
                  })
                : []
        const sellerMap = new Map(sellers.map(s => [s.id, s.name]))
        const values: FilterValue[] = sellerCounts
            .filter(sc => isPositiveNumber(sc.sellerId))
            .map(sc => ({
                id: sc.sellerId,
                name: sellerMap.get(sc.sellerId) || null,
                count: sc._count._all || 0,
            }))
        return {
            name: 'Продавец',
            slug: 'seller',
            values,
        }
    }

    private async getBrandFilter(categoryIds: number[]): Promise<Filter> {
        const brandCounts = await this.db.product.groupBy({
            where: { categoryId: { in: categoryIds }, brandId: { not: null } },
            by: ['brandId'],
            _count: { _all: true },
        })
        const brandIds = brandCounts
            .filter(bc => isPositiveNumber(bc.brandId))
            .map(bc => bc.brandId)
        const brands =
            brandIds.length > 0
                ? await this.db.brand.findMany({
                      where: { id: { in: brandIds.filter(isPositiveNumber) } },
                      select: { id: true, name: true },
                  })
                : []
        const brandMap = new Map(brands.map(b => [b.id, b.name]))
        const values: FilterValue[] = brandCounts
            .filter(bc => isPositiveNumber(bc.brandId))
            .map(bc => ({
                id: bc.brandId as number,
                name: brandMap.get(bc.brandId as number) ?? null,
                count: bc._count._all || 0,
            }))
        return {
            name: 'Бренд',
            slug: 'brand',
            values,
        }
    }

    private async getPriceFilter(categoryIds: number[]): Promise<Filter> {
        const priceAggregates = await this.db.product.aggregate({
            where: { categoryId: { in: categoryIds } },
            _min: { price: true },
            _max: { price: true },
        })
        return {
            name: 'Ціна',
            slug: 'price',
            values: {
                min: priceAggregates._min.price ? Number(priceAggregates._min.price) : 0,
                max: priceAggregates._max.price ? Number(priceAggregates._max.price) : 0,
            },
        }
    }
}
