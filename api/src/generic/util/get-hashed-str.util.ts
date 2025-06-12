import { createHash } from 'crypto'

export function getHashedStr(str: string) {
    return createHash('md5').update(str).digest('hex')
}
