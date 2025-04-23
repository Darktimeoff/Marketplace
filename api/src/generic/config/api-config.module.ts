import { NestJSTypedConfigModule } from '@rnw-community/nestjs-typed-config'
import { EnvironmentVariablesEnum } from './enum/enviroment-variables.enum'
import { EnvironmentVariablesInterface } from './interface/environment-variables.interface'
import { environmentVariablesValidationSchema } from './validation/enviroment-variables.validation'
import { Global, Injectable, Module } from '@nestjs/common'

export const [BaseConfigModule, BaseConfigService] = NestJSTypedConfigModule.create<
    EnvironmentVariablesEnum,
    EnvironmentVariablesInterface
>(environmentVariablesValidationSchema)

@Injectable()
export class ApiConfigService extends BaseConfigService {}

@Global()
@Module({
    imports: [BaseConfigModule],
    providers: [ApiConfigService],
    exports: [ApiConfigService],
})
export class ApiConfigModule {}
