import { readFileSync, unlinkSync } from 'fs'
import { join } from 'path'

import { BadRequest } from '../../exceptions/bad-request';
import { USER_NOT_FOUND } from '../../exceptions/messages';
import { UserRepository } from '../account/user-repository';
import { TEMP_DIR } from './../../../infra/config/variables-global';
import { Audio } from './../../../infra/entities/audio';
import { AUDIO_NOT_FOUND } from './../../exceptions/messages';
import { NotFound } from './../../exceptions/not-found';
import { ManageAudioProtocol } from './../../protocols/manager-audios.protocol';
import { ManageAudioRepository } from './manage-audio-repository';

export class ManageAudioService implements ManageAudioProtocol {

    private repository: ManageAudioRepository
    private userRepository: UserRepository

    constructor(repository: ManageAudioRepository, userRepository: UserRepository) {
        this.repository = repository
        this.userRepository = userRepository
    }
    async save(audio: Audio, userId: string): Promise<Audio> {

        const existUser = await this.userRepository.findById(userId)

        if (!existUser) throw new BadRequest(USER_NOT_FOUND)

        audio.user = existUser

        const path = join(TEMP_DIR, audio.name)
        const file = readFileSync(path)

        audio.content = file

        const result = await this.repository.save(audio)

        unlinkSync(path)

        return result
    }

    async listAll(userId: string): Promise<Audio[]> {
        return await this.repository.findAll(userId)
    }

    async findByIdAndByUserId(userId: string, audioId: string): Promise<Audio> {
        const result = await this.repository.findByIdAndByUserId(userId, audioId)

        if (!result) throw new BadRequest(AUDIO_NOT_FOUND)

        return result
    }

    update(userId: string, audioId: string): Promise<Audio> {
        throw new NotFound('Method not implemented.');
    }

    async delete(userId: string, audioId: string): Promise<void> {
        await this.findByIdAndByUserId(userId, audioId)
        await this.repository.delete(userId, audioId)
    }


}