import { Injectable } from '@nestjs/common'
import { SellerNameInterface } from 'contracts'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'
import { SellerDataloader } from '@/seller/dataloader/seller.dataloader'

@Injectable()
export class SellerDataloaderService {
    constructor(private readonly dataloader: SellerDataloader) {}

    @Log(
        ids => `Find seller names by ids: ${ids}`,
        (result, ids) => `Found ${result.length} seller names by ids "${ids}"`,
        (error, ids) => `Failed finding seller names by ids "${ids}": ${getErrorMessage(error)}`
    )
    async findNameByIds(ids: number[]): Promise<SellerNameInterface[]> {
        return await this.dataloader.findNameByIds(ids)
    }
}
