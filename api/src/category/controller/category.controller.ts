import { Controller, Get, Injectable } from '@nestjs/common'
import { CategoryDataloaderService } from '@/category/service/category-dataloader.service'
import { CategoryDto } from '@/category/dto/category.dto'
import { CategoryTreeWithChildrensInterface } from 'contracts'
import { UseTransformValidator } from '@/generic/decorator/use-transform-validator.decorator'
@Injectable()
@Controller('category')
export class CategoryController {
    constructor(private readonly dataloader: CategoryDataloaderService) {}

    @UseTransformValidator(CategoryDto)
    @Get()
    async getAll(): Promise<CategoryTreeWithChildrensInterface[]> {
        return await this.dataloader.getAll()
    }
}
