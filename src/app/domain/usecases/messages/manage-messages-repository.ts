import { MessageModel } from './../../models/message';

export interface ManageMessagesRepository {
    save(message: MessageModel): Promise<MessageModel>
    findAll(userId: number): Promise<MessageModel[]>
    findByIdAndByUserId(userId: number, messageId: number): Promise<MessageModel>
    update(userId: number, messageId: number): Promise<MessageModel>
    delete(userId: number, messageId: number): Promise<void>
}