import { LooginDto } from './../dto/user/login.dto';
import { UserAccountProtocol } from './../../domain/protocols/user-account.protocol';
import { Request, Response } from "express";

import { CreateAccount, CreateAccountDto } from './../dto/user/create-account.dto';

export class UserAccountController {

    private service: UserAccountProtocol

    constructor(service: UserAccountProtocol) {
        this.service = service
    }

    async register(req: Request, res: Response) {

        try {
            const dto: CreateAccount = req.body

            const result = await this.service.register(CreateAccountDto.of(dto))

            return res.status(201).json(CreateAccountDto.ofResponse(result)).end()

        } catch (error) {
            return res.status(error.status).json(error).end()
        }
    }

    async login(req: Request, res: Response) {

        try {
            const dto: LooginDto = req.body

            const result = await this.service.login(dto)

            return res.status(200).json(result).end()

        } catch (error) {
            return res.status(error.status).json(error).end()
        }
    }
}