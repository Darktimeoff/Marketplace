import { BaseModelInterface } from '@/generic'
import { MediaEntityInterface } from '@/media/entity/media-entity.interface'

type MediaModelFields = 'url' | 'type' | 'format'

export interface MediaModelInterface
    extends BaseModelInterface,
        Pick<MediaEntityInterface, MediaModelFields> {}
