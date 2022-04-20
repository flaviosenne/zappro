import { BadRequest } from './../../exceptions/bad-request';
import { USER_NOT_FOUND } from './../../exceptions/messages';
import { PaymentProtocol } from './../../protocols/payment-protocol';
import { UserRepository } from './../account/user-repository';
import { PaymentEnum } from './payment.enum';

export class PaymentService {

    private payment: PaymentProtocol
    private userRepository: UserRepository

    constructor(payment: PaymentProtocol, userRepository: UserRepository) {
        this.payment = payment
        this.userRepository = userRepository
    }

    async send(data: any, userId: string): Promise<any> {
        try {

            const existsUser = await this.userRepository.findById(userId)

            if (!existsUser) throw new BadRequest(USER_NOT_FOUND)

            this.payment.send(data)

            return { status: PaymentEnum.PENDING, message: 'payment in proccess' }
        } catch (e) {
            return { status: PaymentEnum.ERROR, message: '' }
        }
    }
}