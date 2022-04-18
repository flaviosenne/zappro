import { UserAccountService } from '../../domain/usecases/account/user-account';
import { BcryptAdapter } from '../../infra/adapters/bcrypt-adapter';
import { JwtAdapter } from '../../infra/adapters/jwt-adapter';
import { UserRepositoryImpl } from '../../infra/repositories/impl/user-repository-impl';
import { UserAccountController } from '../controllers/user-account.controller';

export class UserFactory {

    static getUserControllerInstance() {
        return new UserAccountController(UserFactory.getUserServiceInstance())
    }

    static getUserServiceInstance() {
        return new UserAccountService(
            new UserRepositoryImpl(),
            new BcryptAdapter(),
            new JwtAdapter())
    }
}