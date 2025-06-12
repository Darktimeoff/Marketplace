import { Inject, Logger } from '@nestjs/common'
import { CacheService } from '@/generic/cache/cache.service'
import { MethodDecoratorType } from '@/generic/type/method-decorator.type'
import { CacheKeyFactory } from './сached.decorator'

export function CachedDelete<TResult, TArgs extends unknown[] = unknown[]>(
    key: string | CacheKeyFactory<TArgs>
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

            const result = await originalMethod.apply(this, args)

            const deleted = await cacheService.del(cacheKey)

            logger.debug(`${deleted ? 'Deleted' : 'Not found'} cache: ${cacheKey}`)

            return result
        }

        return descriptor
    }
}
