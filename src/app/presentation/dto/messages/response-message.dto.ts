import { Message } from './../../../infra/entities/message';

export class ResponseMessageDto {
    id: string
    createdAt: Date
    updatedAt: Date
    description: string
    user: { id: string }

    static response(message: Message): ResponseMessageDto {
        return {
            id: message.id,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
            description: message.description,
            user: { id: message.user.id }
        }
    }

    static responseList(messages: Message[]): ResponseMessageDto[] {
        return messages.map(message => {
            return {
                id: message.id,
                createdAt: message.createdAt,
                updatedAt: message.updatedAt,
                description: message.description,
                user: { id: message.user.id }
            }
        })
    }
}