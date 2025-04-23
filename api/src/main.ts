import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { Logger } from '@nestjs/common'

async function bootstrap() {
    const host = process.env.HOST ?? 'localhost'
    const port = process.env.PORT ?? 3000
    const dbName = process.env.DB_NAME ?? 'api'

    const app = await NestFactory.create(AppModule)
    await app.listen(port)
    Logger.log('Marketplace API started ', {
        db: dbName,
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
