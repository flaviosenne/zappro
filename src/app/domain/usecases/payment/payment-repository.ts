import { PaymentModel } from './../../models/payment';

export interface PaymentRepository {
    save(payment: PaymentModel): Promise<PaymentModel>
    findAll(userId: number): Promise<PaymentModel[]>
    findByIdAndByUserId(userId: number, paymentId: number): Promise<PaymentModel>
    update(userId: number, paymentId: number): Promise<PaymentModel>
}