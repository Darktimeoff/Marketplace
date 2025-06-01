import { Injectable } from '@nestjs/common'
import { BrandDataloaderService } from '@/brand/service/brand-dataloader.service'
import { BrandNameModelInterface } from 'contracts'

@Injectable()
export class BrandFacade {
    constructor(private readonly dataloader: BrandDataloaderService) {}

    async getNameByIds(ids: number[]): Promise<BrandNameModelInterface[]> {
        return await this.dataloader.getNameByIds(ids)
    }
}
