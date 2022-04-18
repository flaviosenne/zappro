import { UserModel } from './user';

export class MessageModel {
    id: number
    createdAt: Date
    updatedAt: Date
    description: string
    user: UserModel
}