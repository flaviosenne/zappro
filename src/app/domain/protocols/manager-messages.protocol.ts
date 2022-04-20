import { Message } from "../../infra/entities/message";

export interface ManageMessagesProtocol {
    save(message: Message, userId: string): Promise<Message>
    listAll(userId: string): Promise<Message[]>
    findByIdAndByUserId(userId: string, messageId: string): Promise<Message>
    update(userId: string, messageId: string): Promise<Message>
    delete(userId: string, messageId: string): void
}