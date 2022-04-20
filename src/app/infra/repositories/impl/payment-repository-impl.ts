import { DataSource } from 'typeorm';

import { PaymentModel } from '../../../domain/models/payment';
import { PaymentEnum } from '../../../domain/usecases/payment/payment.enum';
import { DBInstance } from '../../config/db';
import { PaymentRepository } from './../../../domain/usecases/payment/payment-repository';
import { Payment } from './../../entities/payment';

export class PaymentRepositoryImpl implements PaymentRepository {

    connection: DataSource

    constructor() {
        DBInstance.then(connection => {
            this.connection = connection
        })
    }

    async save(payment: Payment): Promise<PaymentModel> {
        return await this.connection.getRepository(Payment).save(payment)
    }

    async findAll(userId: string): Promise<PaymentModel[]> {
        return await this.connection.getRepository(Payment).find({
            relations: ['user'],
            where: { user: { id: userId } }
        })
    }

    async findByIdAndByUserId(userId: string, paymentResponseId: string): Promise<PaymentModel> {
        try {
            return await this.connection.getRepository(Payment)
                .createQueryBuilder('payment')
                .innerJoinAndSelect('payment.user', 'user')
                .select()
                .where('payment.paymentResponseId = :paymentResponseId', { paymentResponseId })
                .andWhere('user.id = :userId', { userId })
                .getOne()
        }
        catch (error) {
            return null
        }
    }

    async updateCompleted(paymentResponseId: string): Promise<void> {
        await this.connection.getRepository(Payment)
            .createQueryBuilder('payment')
            .update(Payment)
            .set({ status: PaymentEnum.COMPLETED })
            .where('payment.paymentResponseId = :paymentResponseId', { paymentResponseId })
            .execute()
    }

    async updateError(paymentResponseId: string): Promise<void> {
        await this.connection.getRepository(Payment)
            .createQueryBuilder('payment')
            .update(Payment)
            .set({ status: PaymentEnum.ERROR })
            .where('payment.paymentResponseId = :paymentResponseId', { paymentResponseId })
            .execute()
    }


}