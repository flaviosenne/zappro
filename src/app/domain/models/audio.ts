import { UserModel } from "./user";

export class AudioModel {
    id: number
    createdAt: Date
    updatedAt: Date
    extension: string
    content: Buffer
    name: string
    size: string
    user: UserModel

}