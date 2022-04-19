import { configure, preferences } from 'mercadopago'
import { PreferenceItem } from 'mercadopago/models/preferences/create-payload.model';
import { PreferenceCreateResponse } from 'mercadopago/resources/preferences';
import { ServerError } from '../../domain/exceptions/server-error';
import { PaymentProtocol } from './../../domain/protocols/payment-protocol';

const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN
const MERCADOPAGO_URI = process.env.MERCADOPAGO_URI
const MERCADOPAGO_WEBHOOK_URI = process.env.MERCADOPAGO_WEBHOOK_URI
const CHECKOUT_URI = `${MERCADOPAGO_URI}/checkout/preferences?access_token=${MERCADOPAGO_ACCESS_TOKEN}`
// const PAYMENT_URI = `${MERCADOPAGO_URI}/v1/payments/${id}?access_token=${MERCADOPAGO_ACCESS_TOKEN}`

const webhooks = {
    'success': 'http://localhost:5000/cli8ent/success',
    'failure': 'http://localhost:5000/cli8ent/failure',
    'pending': 'http://localhost:5000/cli8ent/pending'
}

export class MercadopagoService implements PaymentProtocol {

    async send(items: PreferenceItem[]): Promise<any> {

        try {

            configure({
                access_token: MERCADOPAGO_ACCESS_TOKEN
            })

            const result: PreferenceCreateResponse = await preferences.create({ items, back_urls: webhooks })

            return result.body
        }
        catch (e) {
            throw new ServerError('Error integration payment service')
        }
    }

}