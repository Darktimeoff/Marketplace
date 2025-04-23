import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    await app.listen(process.env.PORT ?? 3000)
}

void bootstrap().catch((err: unknown) => {
    if (err instanceof Error) {
        Logger.error(err, { critical: true, stack: err.stack })
    } else {
        Logger.error(err, { critical: true })
    }
})
