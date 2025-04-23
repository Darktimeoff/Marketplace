import { ApiConfigModule } from '@/generic/config/api-config.module'
import { Module } from '@nestjs/common'

@Module({
    imports: [ApiConfigModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
