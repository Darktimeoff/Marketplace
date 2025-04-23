import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { Logger } from '@nestjs/common'
import { ApiConfigService } from './generic/config/api-config.module'
import { EnvironmentVariablesEnum } from './generic/config/enum/enviroment-variables.enum'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ApiConfigService)

    const host = configService.get(EnvironmentVariablesEnum.HOST)
    const port = configService.get(EnvironmentVariablesEnum.PORT)

    await app.listen(port, host)
    Logger.log('Marketplace API started ', {
        // db: dbName,
        url: `http://${host}:${port}`,
        context: 'Bootstrap',
        pid: process.pid,
    })
}

void bootstrap().catch((err: unknown) => {
    if (err instanceof Error) {
        Logger.error(err, { critical: true, stack: err.stack })
    } else {
        Logger.error(err, { critical: true })
    }
})
