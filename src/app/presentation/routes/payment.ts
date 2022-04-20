import { Router } from "express"

import { logged } from '../../infra/midlewares/auth';
import { PaymentFactory } from './../factories/payment.factory';

const paymentRoutes = Router()

const payment = PaymentFactory.getPaymentControllerInstance()

paymentRoutes.post('/payment', logged, payment.send.bind(payment))
paymentRoutes.post('/payment-webhhok/success', payment.webhookSuccess.bind(payment))
paymentRoutes.post('/payment-webhhok/failure', payment.webhookFailure.bind(payment))
paymentRoutes.post('/payment-webhhok/pending', payment.webhookPending.bind(payment))


export { paymentRoutes }