import { UserRepositoryImpl } from '../../infra/repositories/impl/user-repository-impl';
import { PaymentService } from './../../domain/usecases/payment/payment';
import { MercadopagoService } from './../../infra/adapters/mercadopago-adapter';
import { PaymentController } from './../controllers/payment.controller';

export class PaymentFactory {

    static getPaymentControllerInstance() {
        return new PaymentController(
            PaymentFactory.getPaymentServiceInstance()
        )
    }

    static getPaymentServiceInstance() {
        return new PaymentService(
            new MercadopagoService(),
            new UserRepositoryImpl()
        )
    }
}