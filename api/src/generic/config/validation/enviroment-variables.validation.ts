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
    [EnvironmentVariablesEnum.DB_NAME]: Joi.string().required(),
    [EnvironmentVariablesEnum.DB_USER]: Joi.string().required(),
    [EnvironmentVariablesEnum.DB_PASSWORD]: Joi.string().required(),
    [EnvironmentVariablesEnum.DB_PORT]: Joi.number().required(),
    [EnvironmentVariablesEnum.DATABASE_URL]: Joi.string().required(),
    [EnvironmentVariablesEnum.PRISMA_OPTIMIZE_API_KEY]: Joi.string(),
    [EnvironmentVariablesEnum.PRISMA_QUERY_LOG_ENABLED]: Joi.boolean().default(false),
    [EnvironmentVariablesEnum.REDIS_CACHE_PORT]: Joi.number().default(6381),
})
