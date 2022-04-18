import { DataSource } from 'typeorm';

import { UserModel } from '../../../domain/models/user';
import { User } from '../../entities/user';
import { UserRepository } from './../../../domain/usecases/account/user-repository';
import { DBInstance } from './../../config/db';

export class UserRepositoryImpl implements UserRepository {

    connection: DataSource

    constructor() {
        DBInstance.then(connection => {
            this.connection = connection
        })
    }

    async findByEmail(email: string): Promise<UserModel> {
        return await this.connection.getRepository(User).findOneBy({ email })
    }

    async findById(id: number): Promise<UserModel> {
        return await this.connection.getRepository(User).findOneBy({ id })
    }

    async save(user: User): Promise<User> {
        return await this.connection.getRepository(User).save<User>(user)
    }

}