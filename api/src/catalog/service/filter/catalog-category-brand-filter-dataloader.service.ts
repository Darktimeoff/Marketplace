import { Injectable } from '@nestjs/common'
import { CatalogCategoryFilterServiceInterface } from '@/catalog/interface/catalog-category-filter-service.interface'
import type {
    CatalogFilterInputInterface,
    CatalogFilterInteface,
    CatalogFilterValuesSelectType,
} from 'contracts'
import { getErrorMessage } from '@rnw-community/shared'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'
import { Log } from '@rnw-community/nestjs-enterprise'
import { CatalogCategoryBrandFilterDataloader } from '@/catalog/dataloader/catalog-category-brand-filter.dataloader'
import { CatalogCategorySelectFilterTemplateDataloaderService } from './catalog-category-select-filter-template-dataloader.service'
import { NamesFilterModelInterface } from '@/catalog/interface/names-filter-model.interface'
import { FilterCountableModelInterface } from '@/catalog/interface/filter-countable-model.interface'

@Injectable()
export class CatalogCategoryBrandFilterDataloaderService
    extends CatalogCategorySelectFilterTemplateDataloaderService
    implements CatalogCategoryFilterServiceInterface
{
    constructor(private readonly dataloader: CatalogCategoryBrandFilterDataloader) {
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
    async getFilters(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface> {
        return await super.getFilters(categoryIds, filters)
    }

    protected getCount(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<FilterCountableModelInterface[]> {
        return this.dataloader.getCount(categoryIds, filters)
    }

    protected getNames(ids: number[]): Promise<NamesFilterModelInterface[]> {
        return this.dataloader.getNames(ids)
    }

    protected prepareFilter(values: CatalogFilterValuesSelectType[]): CatalogFilterInteface {
        return {
            id: 2,
            name: 'Бренд',
            slug: CatalogDefaultFilterSlugEnum.BRAND,
            values,
        }
    }
}
