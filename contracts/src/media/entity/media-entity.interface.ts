import { BaseEntityInterface } from '@/generic'
import { MediaInterface } from '@/media/interface/media.interface'
import { MediaAssociationInterface } from '@/media/association/media-association.interface'

export interface MediaEntityInterface
    extends BaseEntityInterface,
        MediaInterface,
        MediaAssociationInterface {}
