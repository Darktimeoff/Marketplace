import { Global, Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { ApiConfigModule } from '@/generic/config/api-config.module'
import { ApiConfigService } from '@/generic/config/api-config.module'
import KeyvRedis from '@keyv/redis'
import { EnvironmentVariablesEnum } from '@/generic/config/enum/enviroment-variables.enum'
import { CacheService } from './cache.service'

@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ApiConfigModule],
            inject: [ApiConfigService],
            useFactory: async (configService: ApiConfigService) => {
                return {
                    stores: [
                        new KeyvRedis({
                            url: `redis://localhost:${configService.get(EnvironmentVariablesEnum.REDIS_CACHE_PORT)}`,
                        }),
                    ],
                }
            },
            isGlobal: true,
        }),
    ],
    providers: [CacheService],
    exports: [CacheService],
})
export class AppCacheModule {}
