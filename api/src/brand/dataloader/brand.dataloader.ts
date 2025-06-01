import { DBService } from "@/generic/db/db.service";
import { Injectable } from "@nestjs/common";
import { BrandNameModelInterface } from "contracts";

@Injectable()
export class BrandDataloader {
    constructor(private readonly db: DBService) {}

    async getNameByIds(ids: number[]): Promise<BrandNameModelInterface[]> {
        return await this.db.brand.findMany({
            where: { id: { in: ids } },
            select: { id: true, name: true },
        })
    }
}