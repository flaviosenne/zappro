import { readFileSync, unlinkSync } from 'fs'
import { join } from 'path'

import { TEMP_DIR } from '../../../infra/config/variables-global';
import { BadRequest } from '../../exceptions/bad-request';
import { USER_NOT_FOUND } from '../../exceptions/messages';
import { VIDEO_NOT_FOUND } from '../../exceptions/messages';
import { NotFound } from '../../exceptions/not-found';
import { ManageVideoProtocol } from '../../protocols/manager-videos.protocol';
import { UserRepository } from '../account/user-repository';
import { Video } from './../../../infra/entities/video';
import { ManageVideoRepository } from './manage-video-repository';

export class ManageVideoService implements ManageVideoProtocol {

    private repository: ManageVideoRepository
    private userRepository: UserRepository

    constructor(repository: ManageVideoRepository, userRepository: UserRepository) {
        this.repository = repository
        this.userRepository = userRepository
    }

    async save(video: Video, userId: number): Promise<Video> {

        const existUser = await this.userRepository.findById(userId)

        if (!existUser) throw new BadRequest(USER_NOT_FOUND)

        video.user = existUser

        const path = join(TEMP_DIR, video.name)
        const file = readFileSync(path)

        video.content = file

        const result = await this.repository.save(video)

        unlinkSync(path)

        return result
    }

    async listAll(userId: number): Promise<Video[]> {
        return await this.repository.findAll(userId)
    }

    async findByIdAndByUserId(userId: number, videoId: number): Promise<Video> {
        const result = await this.repository.findByIdAndByUserId(userId, videoId)

        if (!result) throw new BadRequest(VIDEO_NOT_FOUND)

        return result
    }

    update(userId: number, videoId: number): Promise<Video> {
        throw new NotFound('Method not implemented.');
    }

    async delete(userId: number, videoId: number): Promise<void> {
        await this.findByIdAndByUserId(userId, videoId)
        await this.repository.delete(userId, videoId)
    }


}