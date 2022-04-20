import { UserModel } from './../../models/user';

export interface UserRepository {
    save(user: UserModel): Promise<UserModel>
    findByEmail(email: string): Promise<UserModel>
    findById(id: string): Promise<UserModel>
}