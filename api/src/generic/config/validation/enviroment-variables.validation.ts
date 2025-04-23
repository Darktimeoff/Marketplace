import Joi from 'joi'
import { NodeEnviromentEnum } from '@/generic/config/enum/node-enviroment.enum'
import { EnvironmentVariablesEnum } from '@/generic/config/enum/enviroment-variables.enum'
import { EnvironmentVariablesInterface } from '@/generic/config/interface/environment-variables.interface'

export const environmentVariablesValidationSchema = Joi.object<EnvironmentVariablesInterface>({
    [EnvironmentVariablesEnum.NODE_ENV]: Joi.string()
        .valid(...Object.values(NodeEnviromentEnum))
        .default(NodeEnviromentEnum.DEVELOPMENT),
    [EnvironmentVariablesEnum.PORT]: Joi.number().default(4080),
    [EnvironmentVariablesEnum.HOST]: Joi.string().default('localhost'),
})
