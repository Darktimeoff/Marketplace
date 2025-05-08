import { BaseEntityInterface } from '@/generic'
import { MediaFormatEnum } from '@/media/enum/media-format.enum'
import { MediaTypeEnum } from '@/media/enum/media-type.enum'

export interface MediaEntityInterface extends BaseEntityInterface {
    url: string
    type: `${MediaTypeEnum}`
    format: `${MediaFormatEnum}`
}
