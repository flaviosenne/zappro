import { Request, Response } from "express";

import { Payload } from '../../domain/utils/payload';
import { ManageVideoProtocol } from './../../domain/protocols/manager-videos.protocol';
import { VideoDto } from './../dto/videos/videos.dto';

export class ManageVideoController {

    private service: ManageVideoProtocol

    constructor(service: ManageVideoProtocol) {
        this.service = service
    }

    async save(req: Request, res: Response) {

        try {
            const file = req.file

            const payload: Payload = req['payload']

            const result = await this.service.save(VideoDto.of(file), payload.id)

            return res.status(201).json(result).end()

        } catch (error) {
            return res.status(error.status).json(error).end()
        }
    }

    async findAll(req: Request, res: Response) {

        try {
            const payload: Payload = req['payload']

            const result = await this.service.listAll(payload.id)

            const content = VideoDto.ofResponse(result)

            return res.status(200).json(content)

        } catch (error) {
            return res.status(error.status).json(error).end()
        }
    }


    async delete(req: Request, res: Response) {

        try {
            const payload: Payload = req['payload']

            await this.service.delete(payload.id, Number(req.params.id))

            return res.status(204).end()

        } catch (error) {
            return res.status(error.status).json(error).end()
        }
    }

}