import { Injectable } from '@nestjs/common'
import { SellerDataloaderService } from '@/seller/service/seller-dataloader.service'
import { SellerNameInterface } from 'contracts'

@Injectable()
export class SellerFacade {
    constructor(private readonly dataloader: SellerDataloaderService) {}

    async getNameByIds(ids: number[]): Promise<SellerNameInterface[]> {
        return await this.dataloader.findNameByIds(ids)
    }
}
