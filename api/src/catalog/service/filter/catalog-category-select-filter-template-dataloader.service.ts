import { CatalogCategoryFilterServiceInterface } from '@/catalog/interface/catalog-category-filter-service.interface'
import { CatalogFilterInputInterface, CatalogFilterValuesSelectType } from 'contracts'
import { CatalogFilterInteface } from 'contracts'
import { FilterCountableModelInterface } from 'contracts'
import { isPositiveNumber } from '@rnw-community/shared'
import { NamesFilterModelInterface } from '@/catalog/interface/names-filter-model.interface'

export abstract class CatalogCategorySelectFilterTemplateDataloaderService
    implements CatalogCategoryFilterServiceInterface
{
    async getFilter(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface> {
        const counts = await this.getCount(categoryIds, filters)

        const ids = counts.filter(c => isPositiveNumber(c.id)).map(c => c.id)

        const nameModels = ids.length > 0 ? await this.getNames(ids) : []
        const nameMap = new Map(nameModels.map(n => [n.id, n.name]))
        const values: CatalogFilterValuesSelectType[] = counts
            .filter(c => isPositiveNumber(c.id))
            .map(c => ({
                id: c.id,
                name: nameMap.get(c.id) ?? null,
                count: c.count,
            }))
            .sort((a, b) => b.count - a.count)

        return this.prepareFilter(values)
    }

    protected abstract getCount(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<FilterCountableModelInterface[]>
    protected abstract getNames(ids: number[]): Promise<NamesFilterModelInterface[]>
    protected abstract prepareFilter(values: CatalogFilterValuesSelectType[]): CatalogFilterInteface
}
