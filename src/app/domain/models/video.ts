import { UserModel } from './user';

export class VideoModel {
    id: string
    createdAt: Date
    updatedAt: Date
    extension: string
    content: Buffer
    name: string
    size: string
    user: UserModel
}