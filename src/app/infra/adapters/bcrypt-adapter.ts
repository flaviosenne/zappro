import bcrypt from 'bcrypt'

import { CriptographyProtocol } from './../../domain/protocols/criptography.protocol';

export class BcryptAdapter implements CriptographyProtocol {

    async encrypt(password: string): Promise<string> {
        return await bcrypt.hash(password, bcrypt.genSaltSync())
    }

    isMatcher(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash)
    }

}