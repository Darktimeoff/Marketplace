import { Injectable } from '@nestjs/common'
import { SellerDataloader } from '@/product-offer/dataloader/seller.dataloader'
import { SellerNameInterface } from 'contracts'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'

@Injectable()
export class SellerService {
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
