import { Controller, Get, Injectable } from '@nestjs/common'
import { CategoryDataloaderService } from '@/category/service/category-dataloader.service'
import { CategoryDto } from '@/category/dto/category.dto'
import { CategoryWithChildrensInterface } from 'contracts'
import { UseSerializeValidator } from '@/generic/decorator/use-transform-validator.decorator'
@Injectable()
@Controller('category')
export class CategoryController {
    constructor(private readonly dataloader: CategoryDataloaderService) {}

    @UseSerializeValidator(CategoryDto)
    @Get()
    async getAllTree(): Promise<CategoryWithChildrensInterface[]> {
        return await this.dataloader.getAllTree()
    }
}
