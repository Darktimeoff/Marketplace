import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductService {
    constructor(private readonly db: DBService) {}
}
