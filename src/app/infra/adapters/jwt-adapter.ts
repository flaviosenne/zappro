import jwt from 'jsonwebtoken'

import { AuthenticateProtocol } from './../../domain/protocols/authenticate.protocol';
import { SECRET } from './../config/variables-global';

export class JwtAdapter implements AuthenticateProtocol {

    generateToken(payload: any): string {
        return jwt.sign(payload, SECRET, { expiresIn: '1d' })
    }
    isValidToken(token: string): boolean {
        try {
            return jwt.verify(token, SECRET) ? true : false
        } catch (error) {
            return false
        }
    }
    retrievePayload(token: string) {
        return jwt.decode(token)
    }

}