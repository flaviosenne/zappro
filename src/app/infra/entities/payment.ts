import { PaymentEnum } from './../../domain/usecases/payment/payment.enum';
import { PaymentModel } from './../../domain/models/payment';
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

import { User } from "./user";

@Entity('payment')
export class Payment implements PaymentModel {
    @PrimaryColumn()
    @Generated()
    id: number

    @CreateDateColumn({ name: 'created_at', default: Date.now() })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @Column({ name: 'payment_response_id' })
    paymentResponseId: number

    @Column({ name: 'status' })
    status: PaymentEnum

    @ManyToOne(() => User, user => user.id, { cascade: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User

}