import {
    NestJSTypedConfigModule,
    NestJSTypedConfigService,
} from '@rnw-community/nestjs-typed-config'
import { EnvironmentVariablesEnum } from './enum/enviroment-variables.enum'
import { EnvironmentVariablesInterface } from './interface/environment-variables.interface'
import { environmentVariablesValidationSchema } from './validation/enviroment-variables.validation'
import { DynamicModule, Global, Injectable, Module, Type } from '@nestjs/common'

const [BaseConfigModuleClass, BaseConfigServiceClass] = NestJSTypedConfigModule.create<
    EnvironmentVariablesEnum,
    EnvironmentVariablesInterface
>(environmentVariablesValidationSchema)

export const BaseConfigModule: DynamicModule = BaseConfigModuleClass
export const BaseConfigService: Type<
    NestJSTypedConfigService<
        EnvironmentVariablesEnum,
        EnvironmentVariablesInterface,
        keyof EnvironmentVariablesInterface
    >
> = BaseConfigServiceClass

@Injectable()
export class ApiConfigService extends BaseConfigService {}

@Global()
@Module({
    imports: [BaseConfigModule],
    providers: [ApiConfigService],
    exports: [ApiConfigService],
})
export class ApiConfigModule {}
