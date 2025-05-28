import { Injectable } from '@nestjs/common'
import { CatalogCategoryFilterServiceInterface } from '@/catalog/interface/catalog-category-filter-service.interface'

import { DBService } from '@/generic/db/db.service'
import { CatalogCategoryFilterDataloader } from '@/catalog/dataloader/catalog-category-filter.dataloader'
import { CatalogFilterInteface } from 'contracts'
import { CatalogFilterInputInterface } from 'contracts'
import { isPositiveNumber } from '@rnw-community/shared'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'

@Injectable()
export class CatalogCategorySellerFilterDataloaderService
    implements CatalogCategoryFilterServiceInterface
{
    constructor(
        private readonly db: DBService,
        private readonly filterDataloader: CatalogCategoryFilterDataloader
    ) {}

    async getFilters(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface> {
        const sellerCounts = await this.db.product.groupBy({
            where: {
                categoryId: { in: categoryIds },
                ...(await this.filterDataloader.buildProductWhereByFilters(
                    filters,
                    CatalogDefaultFilterSlugEnum.SELLER
                )),
            },
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
        const values = sellerCounts
            .filter(sc => isPositiveNumber(sc.sellerId))
            .map(sc => ({
                id: sc.sellerId,
                name: sellerMap.get(sc.sellerId) || null,
                count: sc._count._all || 0,
            }))
            .sort((a, b) => b.count - a.count)
        return {
            id: 1,
            name: 'Продавец',
            slug: CatalogDefaultFilterSlugEnum.SELLER,
            values,
        }
    }
}
