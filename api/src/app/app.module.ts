import { ApiConfigModule } from '@/generic/config/api-config.module'
import { DBModule } from '@/generic/db/db.module'
import { Module } from '@nestjs/common'

@Module({
    imports: [ApiConfigModule, DBModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
