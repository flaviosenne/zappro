import { Audio } from './../../../infra/entities/audio';

export interface ManageAudioRepository {
    save(audio: Audio): Promise<Audio>
    findAll(userId: number): Promise<Audio[]>
    findByIdAndByUserId(userId: number, audioId: number): Promise<Audio>
    update(userId: number, audioId: number): Promise<Audio>
    delete(userId: number, audioId: number): Promise<void>
}