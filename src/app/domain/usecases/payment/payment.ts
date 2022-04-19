import { PaymentEnum } from './payment.enum';
import { USER_NOT_FOUND } from './../../exceptions/messages';
import { BadRequest } from './../../exceptions/bad-request';
import { UserRepository } from './../account/user-repository';
import { PaymentProtocol } from './../../protocols/payment-protocol';

export class PaymentService {

    private payment: PaymentProtocol
    private userRepository: UserRepository

    constructor(payment: PaymentProtocol, userRepository: UserRepository) {
        this.payment = payment
        this.userRepository = userRepository
    }

    async send(data: any, userId: number): Promise<any> {
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