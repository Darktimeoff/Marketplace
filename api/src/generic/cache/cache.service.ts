import { Inject, Injectable } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import type { Cache } from 'cache-manager'
import { CacheTTLEnum } from './cache-ttl.enum'

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async get<T>(key: string): Promise<T | null> {
        return (await this.cacheManager.get<T>(key)) ?? null
    }

    async set<T>(key: string, value: T, ttl: CacheTTLEnum = CacheTTLEnum.ONE_MINUTE): Promise<T> {
        return await this.cacheManager.set<T>(key, value, ttl)
    }

    async del(key: string): Promise<boolean> {
        return await this.cacheManager.del(key)
    }

    async clear(): Promise<void> {
        await this.cacheManager.clear()
    }
}
