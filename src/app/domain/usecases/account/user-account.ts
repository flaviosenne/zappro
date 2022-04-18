import { BAD_CREDENTIALS, ALREADY_EXISTS_EMAIL } from './../../exceptions/messages';
import { AuthenticateProtocol } from './../../protocols/authenticate.protocol';
import { CriptographyProtocol } from './../../protocols/criptography.protocol';
import { BadRequest } from '../../exceptions/bad-request';
import { UserAccountProtocol } from '../../protocols/user-account.protocol';
import { UserModel } from './../../models/user';
import { UserRepository } from './user-repository';

export class UserAccountService implements UserAccountProtocol {

    private repository: UserRepository
    private criptography: CriptographyProtocol
    private authenticate: AuthenticateProtocol

    constructor(repository: UserRepository, criptography: CriptographyProtocol, authenticate: AuthenticateProtocol) {
        this.repository = repository
        this.criptography = criptography
        this.authenticate = authenticate
    }

    async login(user: { email: string; password: string; }): Promise<{ token: string }> {

        const isValidEmail = await this.repository.findByEmail(user.email)

        if (!isValidEmail) throw new BadRequest(BAD_CREDENTIALS)

        const isMatcherPassword = this.criptography.isMatcher(user.password, isValidEmail.password)

        if (!isMatcherPassword) throw new BadRequest(BAD_CREDENTIALS)

        const payload = {
            id: isValidEmail.id,
            email: isValidEmail.email,
            name: isValidEmail.name
        }

        const token = this.authenticate.generateToken(payload)

        return { token }
    }

    async register(user: UserModel): Promise<UserModel> {

        const alreadyExistsUser = await this.repository.findByEmail(user.email)

        if (alreadyExistsUser) throw new BadRequest(ALREADY_EXISTS_EMAIL)


        const hash: string = await this.criptography.encrypt(user.password)

        user.password = hash

        return await this.repository.save(user)
    }
}