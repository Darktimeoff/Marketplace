import { BaseModelInterface } from 'contracts'

export interface NamesFilterModelInterface extends Pick<BaseModelInterface, 'id'> {
    name: string
}
