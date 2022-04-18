import { Message } from "../../../infra/entities/message"

export interface CreateMessage {
    description: string
}

export class CreateMessageDto {
    static of(dto: CreateMessage): Message {
        const { description } = dto

        const entity = new Message()

        entity.description = description
        entity.createdAt = new Date()
        entity.updatedAt = new Date()

        return entity
    }
}
