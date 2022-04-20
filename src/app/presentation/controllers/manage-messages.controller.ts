import { Request, Response } from "express";

import { ManageMessagesProtocol } from '../../domain/protocols/manager-messages.protocol';
import { CreateMessage, CreateMessageDto } from '../dto/messages/create-message.dto';
import { Payload } from './../../domain/utils/payload';
import { ResponseMessageDto } from './../dto/messages/response-message.dto';

export class ManageMessageController {

    private service: ManageMessagesProtocol

    constructor(service: ManageMessagesProtocol) {
        this.service = service
    }

    async save(req: Request, res: Response) {

        try {
            const dto: CreateMessage = req.body

            const payload: Payload = req['payload']

            const result = await this.service.save(CreateMessageDto.of(dto), payload.id)

            return res.status(201).json(ResponseMessageDto.response(result)).end()

        } catch (error) {
            return res.status(error.status).json(error).end()
        }
    }

    async findAll(req: Request, res: Response) {

        try {
            const payload: Payload = req['payload']

            const result = await this.service.listAll(payload.id)

            return res.status(200).json(ResponseMessageDto.responseList(result)).end()

        } catch (error) {
            return res.status(error.status).json(error).end()
        }
    }

    async findById(req: Request, res: Response) {

        try {
            const payload: Payload = req['payload']
            const messageId = req.params.id

            const result = await this.service.findByIdAndByUserId(payload.id, messageId)

            return res.status(200).json(ResponseMessageDto.response(result)).end()

        } catch (error) {
            return res.status(error.status).json(error).end()
        }
    }

    async delete(req: Request, res: Response) {

        try {
            const payload: Payload = req['payload']
            const messageId = req.params.id

            await this.service.delete(payload.id, messageId)

            return res.status(204).end()

        } catch (error) {
            return res.status(error.status).json(error).end()
        }
    }

}