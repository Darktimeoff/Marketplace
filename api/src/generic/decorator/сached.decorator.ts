import { Inject, Logger } from '@nestjs/common'
import { CacheTTLEnum } from '@/generic/cache/cache-ttl.enum'
import { CacheService } from '@/generic/cache/cache.service'
import { MethodDecoratorType } from '@/generic/type/method-decorator.type'
import { isDefined } from '@rnw-community/shared'

export type CacheKeyFactory<TArgs extends unknown[]> = (...args: TArgs) => string

export function Cached<TResult, TArgs extends unknown[] = unknown[]>(
    key: string | CacheKeyFactory<TArgs>,
    ttl: CacheTTLEnum = CacheTTLEnum.ONE_MINUTE
): MethodDecoratorType<TResult, TArgs> {
    const injectCacheService = Inject(CacheService)

    return function (
        target,
        propertyKey,
        descriptor: {
            cacheServiceDecorator?: CacheService
        } & PropertyDescriptor
    ) {
        injectCacheService(target, 'cacheServiceDecorator')
        const originalMethod = descriptor.value as (...args: TArgs) => Promise<TResult>

        if (!originalMethod) {
            throw new Error(`Method ${String(propertyKey)} not found`)
        }

        descriptor.value = async function (...args: TArgs): Promise<TResult> {
            const cacheService = this.cacheServiceDecorator
            const logger = new Logger(`${target.constructor.name}::${propertyKey.toString()}`)

            if (!cacheService) {
                throw new Error('Cache service not found')
            }

            const cacheKey = typeof key === 'string' ? key : key(...args)

            logger.debug(`Getting data by cache key: ${cacheKey}`)

            const cachedResult = await cacheService.get<TResult>(cacheKey)
            if (isDefined(cachedResult)) {
                logger.debug(`Got data from cache: ${cacheKey}`)
                return cachedResult
            }

            logger.debug(`Missed cache, getting data from original method`)

            const result = await originalMethod.apply(this, args)

            await cacheService.set(cacheKey, result, ttl)

            logger.debug(`Set data to cache: ${cacheKey}`)

            return result
        }

        return descriptor
    }
}
