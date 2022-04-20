import { DataSource } from 'typeorm';

import { MessageModel } from '../../../domain/models/message';
import { Message } from '../../entities/message';
import { BadRequest } from './../../../domain/exceptions/bad-request';
import { ManageMessagesRepository } from './../../../domain/usecases/messages/manage-messages-repository';
import { DBInstance } from './../../config/db';

export class ManageMessagesRepositoryImpl implements ManageMessagesRepository {

    connection: DataSource

    constructor() {
        DBInstance.then(connection => {
            this.connection = connection
        })
    }

    async save(message: Message): Promise<MessageModel> {
        return await this.connection.getRepository(Message).save(message)
    }

    async findAll(userId: string): Promise<MessageModel[]> {
        return await this.connection.getRepository(Message).find({
            relations: ['user'],
            where: { user: { id: userId } }
        })
    }

    async findByIdAndByUserId(userId: string, messageId: string): Promise<MessageModel> {
        try {
            return await this.connection.getRepository(Message)
                .createQueryBuilder('message')
                .innerJoinAndSelect('message.user', 'user')
                .select()
                .where('message.id = :messageId', { messageId })
                .andWhere('user.id = :userId', { userId })
                .getOne()
        }
        catch (error) {
            return null
        }
    }
    update(userId: string, messageId: string): Promise<MessageModel> {
        throw new Error('Method not implemented.');
    }

    async delete(userId: string, messageId: string): Promise<void> {
        const result = await this.connection.getRepository(Message)
            .createQueryBuilder('message')
            .innerJoinAndSelect('message.user', 'user')
            .delete()
            .from(Message)
            .where('message.id = :messageId', { messageId })
            .andWhere('user.id = :userId', { userId })
            .execute()

        if (result.affected == 0) throw new BadRequest(`Error in delete message with user-id: ${userId} and message-id: ${messageId}`)
    }


}