import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from './generated'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage, isNotEmptyString } from '@rnw-community/shared'
import { withOptimize } from '@prisma/extension-optimize'
import { ApiConfigService } from '@/generic/config/api-config.module'
import { EnvironmentVariablesEnum } from '@/generic/config/enum/enviroment-variables.enum'
import { BaseEntityInterface } from 'contracts'
import { createPrismaQueryEventHandler } from 'prisma-query-log'

@Injectable()
export class DBService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(private readonly config: ApiConfigService) {
        super({
            log: config.get(EnvironmentVariablesEnum.PRISMA_QUERY_LOG_ENABLED)
                ? [
                      {
                          emit: 'event',
                          level: 'query',
                      },
                  ]
                : [],
        })

        if (
            //@ts-expect-error
            typeof Bun !== 'object' &&
            isNotEmptyString(this.config.get(EnvironmentVariablesEnum.PRISMA_OPTIMIZE_API_KEY))
        ) {
            const optimized = this.$extends(
                withOptimize({
                    apiKey: this.config.get(EnvironmentVariablesEnum.PRISMA_OPTIMIZE_API_KEY),
                })
            )

            Object.assign(this, optimized)
        }
    }

    @Log(
        'Connecting to database...',
        'Connected to database',
        error => `Error connecting to database: ${getErrorMessage(error)}`
    )
    async onModuleInit() {
        await this.$connect()
        if (this.config.get(EnvironmentVariablesEnum.PRISMA_QUERY_LOG_ENABLED)) {
            //@ts-expect-error
            this.$on('query', createPrismaQueryEventHandler())
        }
    }

    @Log(
        'Disconnecting from database...',
        'Disconnected from database',
        error => `Error disconnecting from database: ${getErrorMessage(error)}`
    )
    async onModuleDestroy() {
        await this.$disconnect()
    }

    getDefaultOmit(): Record<
        keyof Pick<BaseEntityInterface, 'deletedAt' | 'createdAt' | 'updatedAt'>,
        boolean
    > {
        return {
            deletedAt: true,
            createdAt: true,
            updatedAt: true,
        }
    }
}
