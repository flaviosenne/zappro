import { AudioModel } from './../../models/audio';

export interface ManageAudioRepository {
    save(audio: AudioModel): Promise<AudioModel>
    findAll(userId: number): Promise<AudioModel[]>
    findByIdAndByUserId(userId: number, audioId: number): Promise<AudioModel>
    update(userId: number, audioId: number): Promise<AudioModel>
    delete(userId: number, audioId: number): Promise<void>
}