import { Message } from '../../../infra/entities/message';
import { BadRequest } from '../../exceptions/bad-request';
import { MESSAGE_NOT_FOUND, USER_NOT_FOUND } from './../../exceptions/messages';
import { NotFound } from './../../exceptions/not-found';
import { ManageMessagesProtocol } from './../../protocols/manager-messages.protocol';
import { UserRepository } from './../account/user-repository';
import { ManageMessagesRepository } from './manage-messages-repository';

export class ManageMessageService implements ManageMessagesProtocol {

    private repository: ManageMessagesRepository
    private userRepository: UserRepository

    constructor(repository: ManageMessagesRepository, userRepository: UserRepository) {
        this.repository = repository
        this.userRepository = userRepository
    }

    async save(message: Message, userId: number): Promise<Message> {

        const existUser = await this.userRepository.findById(userId)

        if (!existUser) throw new BadRequest(USER_NOT_FOUND)

        message.user = existUser

        return await this.repository.save(message)
    }

    async listAll(userId: number): Promise<Message[]> {
        return await this.repository.findAll(userId)
    }

    async findByIdAndByUserId(userId: number, messageId: number): Promise<Message> {
        const result = await this.repository.findByIdAndByUserId(userId, messageId)

        if (!result) throw new BadRequest(MESSAGE_NOT_FOUND)

        return result

    }

    update(userId: number, messageId: number): Promise<Message> {
        throw new NotFound('Method not implemented.');
    }

    async delete(userId: number, messageId: number): Promise<void> {
        await this.findByIdAndByUserId(userId, messageId)
        await this.repository.delete(userId, messageId)
    }

}