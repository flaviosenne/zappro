import { PaymentModel } from './../../models/payment';

export interface PaymentRepository {
    save(payment: PaymentModel): Promise<PaymentModel>
    findAll(userId: string): Promise<PaymentModel[]>
    findByIdAndByUserId(userId: string, paymentId: string): Promise<PaymentModel>
    updateCompleted(paymentResponseId: string): Promise<void>
    updateError(paymentResponseId: string): Promise<void>
}