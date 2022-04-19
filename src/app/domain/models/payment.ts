import { PaymentEnum } from './../usecases/payment/payment.enum';
import { UserModel } from "./user";

export class PaymentModel {
    id: number
    paymentResponseId: number
    createdAt: Date
    updatedAt: Date
    status: PaymentEnum
    user: UserModel
}