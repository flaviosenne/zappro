import { Message } from '../../../infra/entities/message';

export interface ManageMessagesRepository {
    save(message: Message): Promise<Message>
    findAll(userId: number): Promise<Message[]>
    findByIdAndByUserId(userId: number, messageId: number): Promise<Message>
    update(userId: number, messageId: number): Promise<Message>
    delete(userId: number, messageId: number): Promise<void>
}