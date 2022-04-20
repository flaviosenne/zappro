import { PaymentEnum } from './../usecases/payment/payment.enum';
import { UserModel } from "./user";

export class PaymentModel {
    id: string
    paymentResponseId: number
    createdAt: Date
    updatedAt: Date
    status: PaymentEnum
    user: UserModel
}