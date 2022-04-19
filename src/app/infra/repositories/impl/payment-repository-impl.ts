import { Payment } from './../../entities/payment';
import { PaymentRepository } from './../../../domain/usecases/payment/payment-repository';
import { DataSource } from 'typeorm';

import { DBInstance } from '../../config/db';
import { BadRequest } from '../../../domain/exceptions/bad-request';
import { PaymentModel } from '../../../domain/models/payment';

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

    async findAll(userId: number): Promise<PaymentModel[]> {
        return await this.connection.getRepository(Payment).find({
            relations: ['user'],
            where: { user: { id: userId } }
        })
    }

    async findByIdAndByUserId(userId: number, paymentId: number): Promise<PaymentModel> {
        try {
            return await this.connection.getRepository(Payment)
                .createQueryBuilder('payment')
                .innerJoinAndSelect('payment.user', 'user')
                .select()
                .where('payment.id = :paymentId', { paymentId })
                .andWhere('user.id = :userId', { userId })
                .getOne()
        }
        catch (error) {
            return null
        }
    }

    update(userId: number, paymentId: number): Promise<PaymentModel> {
        throw new Error('Method not implemented.');
    }

    async delete(userId: number, paymentId: number): Promise<void> {
        const result = await this.connection.getRepository(Payment)
            .createQueryBuilder('payment')
            .innerJoinAndSelect('payment.user', 'user')
            .delete()
            .from(Payment)
            .where('payment.id = :paymentId', { paymentId })
            .andWhere('user.id = :userId', { userId })
            .execute()

        if (result.affected == 0) throw new BadRequest(`Error in delete payment with user-id: ${userId} and payment-id: ${paymentId}`)

    }


}