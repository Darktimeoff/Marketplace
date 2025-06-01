import { Injectable } from '@nestjs/common'
import { BrandDataloader } from '@/brand/dataloader/brand.dataloader'
import { BrandNameModelInterface } from 'contracts'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'

@Injectable()
export class BrandDataloaderService {
    constructor(private readonly dataloader: BrandDataloader) {}

    @Log(
        ids => `Get brand names by ids: ${ids}`,
        (result, ids) => `Got ${result.length} brand names by ids "${ids}"`,
        (error, ids) => `Failed getting brand names by ids "${ids}": ${getErrorMessage(error)}`
    )
    async getNameByIds(ids: number[]): Promise<BrandNameModelInterface[]> {
        return await this.dataloader.getNameByIds(ids)
    }
}
