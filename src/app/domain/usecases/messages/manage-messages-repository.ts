import { MessageModel } from './../../models/message';

export interface ManageMessagesRepository {
    save(message: MessageModel): Promise<MessageModel>
    findAll(userId: string): Promise<MessageModel[]>
    findByIdAndByUserId(userId: string, messageId: string): Promise<MessageModel>
    update(userId: string, messageId: string): Promise<MessageModel>
    delete(userId: string, messageId: string): Promise<void>
}