import { EnvironmentVariablesEnum } from '@/generic/config/enum/enviroment-variables.enum'
import { NodeEnviromentEnum } from '@/generic/config/enum/node-enviroment.enum'
export interface EnvironmentVariablesInterface {
    [EnvironmentVariablesEnum.PORT]: string
    [EnvironmentVariablesEnum.HOST]: string
    [EnvironmentVariablesEnum.NODE_ENV]: NodeEnviromentEnum
}
