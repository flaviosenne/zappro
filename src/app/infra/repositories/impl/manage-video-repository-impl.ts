import { DataSource } from 'typeorm';

import { BadRequest } from '../../../domain/exceptions/bad-request';
import { VideoModel } from '../../../domain/models/video';
import { DBInstance } from '../../config/db';
import { Video } from '../../entities/video';
import { ManageVideoRepository } from './../../../domain/usecases/videos/manage-video-repository';

export class ManageVideoRepositoryImpl implements ManageVideoRepository {

    connection: DataSource

    constructor() {
        DBInstance.then(connection => {
            this.connection = connection
        })
    }

    async save(video: Video): Promise<VideoModel> {
        return await this.connection.getRepository(Video).save(video)
    }

    async findAll(userId: number): Promise<VideoModel[]> {
        return await this.connection.getRepository(Video).find({
            relations: ['user'],
            where: { user: { id: userId } }
        })
    }

    async findByIdAndByUserId(userId: number, videoId: number): Promise<VideoModel> {
        try {
            return await this.connection.getRepository(Video)
                .createQueryBuilder('video')
                .innerJoinAndSelect('video.user', 'user')
                .select()
                .where('video.id = :videoId', { videoId })
                .andWhere('user.id = :userId', { userId })
                .getOne()
        }
        catch (error) {
            return null
        }
    }

    update(userId: number, videoId: number): Promise<VideoModel> {
        throw new Error('Method not implemented.');
    }

    async delete(userId: number, videoId: number): Promise<void> {
        const result = await this.connection.getRepository(Video)
            .createQueryBuilder('video')
            .innerJoinAndSelect('video.user', 'user')
            .delete()
            .from(Video)
            .where('video.id = :videoId', { videoId })
            .andWhere('user.id = :userId', { userId })
            .execute()

        if (result.affected == 0) throw new BadRequest(`Error in delete video with user-id: ${userId} and video-id: ${videoId}`)

    }


}