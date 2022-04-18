import { NextFunction, Request, Response } from "express"

import { Forbbiden } from "../../domain/exceptions/forbidden"
import { USER_FORBBIDEN } from './../../domain/exceptions/messages';
import { JwtAdapter } from './../adapters/jwt-adapter';

export const logged = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    const jwt = new JwtAdapter()

    const existToken = retrieveToken(String(authorization))

    if (!existToken) return res.status(403).json(new Forbbiden(USER_FORBBIDEN)).end()

    const tokenIsValid = jwt.isValidToken(existToken)

    if (!tokenIsValid) return res.status(403).json(new Forbbiden(USER_FORBBIDEN)).end()

    req['payload'] = jwt.retrievePayload(existToken)

    next()
}

const retrieveToken = (authorization: string) => {
    const token = authorization.substr(7)
    if (authorization.startsWith('Bearer ')) return token

    return null
}