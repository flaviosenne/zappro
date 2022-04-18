import { UserModel } from './../models/user';

type Login = {
    email: string
    password: string
}

type ResponseLogin = {
    token: string
}
export interface UserAccountProtocol {
    register(user: UserModel): Promise<UserModel>
    login(user: Login): Promise<ResponseLogin>
}