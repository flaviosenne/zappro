import { UserModel } from './user';

export class MessageModel {
    id: string
    createdAt: Date
    updatedAt: Date
    description: string
    user: UserModel
}