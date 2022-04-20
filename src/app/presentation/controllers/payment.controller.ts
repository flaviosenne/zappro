import { Request, Response } from "express";

import { Payload } from '../../domain/utils/payload';
import { PaymentProtocol } from './../../domain/protocols/payment-protocol';

export class PaymentController {

    private service: PaymentProtocol

    constructor(service: PaymentProtocol) {
        this.service = service
    }

    async send(req: Request, res: Response) {

        try {
            const content = req.body

            const payload: Payload = req['payload']

            const result = await this.service.send(content, payload.id)

            return res.status(200).json(result).end()

        } catch (error) {
            return res.status(error.status).json(error).end()
        }
    }

    async webhookSuccess(req: Request, res: Response) {

        try {
            const { payment_id, status, merchant_order_id } = req.query

            console.log(`Payment success: ${status}`)

            return res.status(200).json({ payment_id, status, merchant_order_id }).end()

        } catch (error) {
            return res.status(error.status).json(error).end()
        }
    }


    async webhookFailure(req: Request, res: Response) {

        try {
            const { payment_id, status, merchant_order_id } = req.query

            console.log(`Payment failure: ${status}`)

            return res.status(200).json({ payment_id, status, merchant_order_id }).end()

        } catch (error) {
            return res.status(error.status).json(error).end()
        }
    }


    async webhookPending(req: Request, res: Response) {

        try {
            const { payment_id, status, merchant_order_id } = req.query

            console.log(`Payment pending: ${status}`)

            return res.status(200).json({ payment_id, status, merchant_order_id }).end()

        } catch (error) {
            return res.status(error.status).json(error).end()
        }
    }
}