import { CategoryModule } from '@/category/category.module'
import { ApiConfigModule } from '@/generic/config/api-config.module'
import { DBModule } from '@/generic/db/db.module'
import { Module } from '@nestjs/common'

@Module({
    imports: [ApiConfigModule, DBModule, CategoryModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
