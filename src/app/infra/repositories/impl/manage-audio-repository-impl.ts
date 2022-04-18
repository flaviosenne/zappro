import { DataSource } from 'typeorm';

import { DBInstance } from '../../config/db';
import { BadRequest } from './../../../domain/exceptions/bad-request';
import { AudioModel } from './../../../domain/models/audio';
import { ManageAudioRepository } from './../../../domain/usecases/audios/manage-audio-repository';
import { Audio } from './../../entities/audio';

export class ManageAudioRepositoryImpl implements ManageAudioRepository {

    connection: DataSource

    constructor() {
        DBInstance.then(connection => {
            this.connection = connection
        })
    }

    async save(audio: Audio): Promise<AudioModel> {
        return await this.connection.getRepository(Audio).save(audio)
    }

    async findAll(userId: number): Promise<AudioModel[]> {
        return await this.connection.getRepository(Audio).find({
            relations: ['user'],
            where: { user: { id: userId } }
        })
    }

    async findByIdAndByUserId(userId: number, audioId: number): Promise<AudioModel> {
        try {
            return await this.connection.getRepository(Audio)
                .createQueryBuilder('audio')
                .innerJoinAndSelect('audio.user', 'user')
                .select()
                .where('audio.id = :audioId', { audioId })
                .andWhere('user.id = :userId', { userId })
                .getOne()
        }
        catch (error) {
            return null
        }
    }

    update(userId: number, audioId: number): Promise<AudioModel> {
        throw new Error('Method not implemented.');
    }

    async delete(userId: number, audioId: number): Promise<void> {
        const result = await this.connection.getRepository(Audio)
            .createQueryBuilder('audio')
            .innerJoinAndSelect('audio.user', 'user')
            .delete()
            .from(Audio)
            .where('audio.id = :audioId', { audioId })
            .andWhere('user.id = :userId', { userId })
            .execute()

        if (result.affected == 0) throw new BadRequest(`Error in delete message with user-id: ${userId} and audio-id: ${audioId}`)

    }


}