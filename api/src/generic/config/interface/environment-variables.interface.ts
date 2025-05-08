import { EnvironmentVariablesEnum } from '@/generic/config/enum/enviroment-variables.enum'
import { NodeEnviromentEnum } from '@/generic/config/enum/node-enviroment.enum'
export interface EnvironmentVariablesInterface {
    [EnvironmentVariablesEnum.PORT]: string
    [EnvironmentVariablesEnum.HOST]: string
    [EnvironmentVariablesEnum.NODE_ENV]: NodeEnviromentEnum
    [EnvironmentVariablesEnum.DB_NAME]: string
    [EnvironmentVariablesEnum.DB_USER]: string
    [EnvironmentVariablesEnum.DB_PASSWORD]: string
    [EnvironmentVariablesEnum.DB_PORT]: string
    [EnvironmentVariablesEnum.DATABASE_URL]: string
    [EnvironmentVariablesEnum.PRISMA_OPTIMIZE_API_KEY]: string
}
