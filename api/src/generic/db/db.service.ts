import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from './generated'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'

@Injectable()
export class DBService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    @Log(
        'Connecting to database...',
        'Connected to database',
        error => `Error connecting to database: ${getErrorMessage(error)}`
    )
    async onModuleInit() {
        await this.$connect()
    }

    @Log(
        'Disconnecting from database...',
        'Disconnected from database',
        error => `Error disconnecting from database: ${getErrorMessage(error)}`
    )
    async onModuleDestroy() {
        await this.$disconnect()
    }
}
