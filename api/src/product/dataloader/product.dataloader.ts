import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductDataloader {
    constructor(private readonly db: DBService) {}
}
