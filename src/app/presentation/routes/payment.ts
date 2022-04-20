import { Router } from "express"

import { logged } from '../../infra/midlewares/auth';
import { PaymentFactory } from './../factories/payment.factory';

const paymentRoutes = Router()

const payment = PaymentFactory.getPaymentControllerInstance()

paymentRoutes.post('/payment', logged, payment.send.bind(payment))
paymentRoutes.get('/payment-webhhok/success', payment.webhookSuccess.bind(payment))
paymentRoutes.get('/payment-webhhok/failure', payment.webhookFailure.bind(payment))
paymentRoutes.get('/payment-webhhok/pending', payment.webhookPending.bind(payment))


export { paymentRoutes }