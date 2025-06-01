import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'
import { SellerNameModelInterface } from 'contracts'

@Injectable()
export class SellerDataloader {
    constructor(private readonly db: DBService) {}

    async findNameByIds(ids: number[]): Promise<SellerNameModelInterface[]> {
        return await this.db.seller.findMany({
            where: { id: { in: ids } },
            select: { id: true, name: true },
        })
    }
}
