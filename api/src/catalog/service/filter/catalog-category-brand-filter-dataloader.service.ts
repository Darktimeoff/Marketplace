import { Injectable } from '@nestjs/common'
import { CatalogCategoryFilterServiceInterface } from '@/catalog/interface/catalog-category-filter-service.interface'
import type {
    CatalogFilterInputInterface,
    CatalogFilterInteface,
    CatalogFilterValuesSelectType,
} from 'contracts'
import { getErrorMessage } from '@rnw-community/shared'
import { Log } from '@rnw-community/nestjs-enterprise'
import { CatalogCategorySelectFilterTemplateDataloaderService } from './catalog-category-select-filter-template-dataloader.service'
import { NamesFilterModelInterface } from '@/catalog/interface/names-filter-model.interface'
import { FilterCountableModelInterface, ProductFilterSlugEnum } from 'contracts'
import { BrandFacade } from '@/brand/facade/brand.facade'
import { ProductFacade } from '@/product/facade/product-filter.facade'

@Injectable()
export class CatalogCategoryBrandFilterDataloaderService
    extends CatalogCategorySelectFilterTemplateDataloaderService
    implements CatalogCategoryFilterServiceInterface
{
    constructor(
        private readonly brands: BrandFacade,
        private readonly products: ProductFacade
    ) {
        super()
    }

    @Log(
        (categoryIds, filters) =>
            `Get brand filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (result, categoryIds, filters) =>
            `Got ${result.name} brand filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (error, categoryIds, filters) =>
            `Error getting brand filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}": ${getErrorMessage(error)}`
    )
    async getFilter(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface> {
        return await super.getFilter(categoryIds, filters)
    }

    protected async getCount(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<FilterCountableModelInterface[]> {
        return await this.products.getCountByGroupId(categoryIds, filters)
    }

    protected async getNames(ids: number[]): Promise<NamesFilterModelInterface[]> {
        return await this.brands.getNameByIds(ids)
    }

    protected prepareFilter(values: CatalogFilterValuesSelectType[]): CatalogFilterInteface {
        return {
            id: 2,
            name: 'Бренд',
            slug: ProductFilterSlugEnum.BRAND,
            values,
        }
    }
}
