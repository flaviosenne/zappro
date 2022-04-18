import { Message } from "../../infra/entities/message";

export interface ManageMessagesProtocol {
    save(message: Message, userId: number): Promise<Message>
    listAll(userId: number): Promise<Message[]>
    findByIdAndByUserId(userId: number, messageId: number): Promise<Message>
    update(userId: number, messageId: number): Promise<Message>
    delete(userId: number, messageId: number): void
}