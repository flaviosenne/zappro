import { AudioModel } from './../../models/audio';

export interface ManageAudioRepository {
    save(audio: AudioModel): Promise<AudioModel>
    findAll(userId: string): Promise<AudioModel[]>
    findByIdAndByUserId(userId: string, audioId: string): Promise<AudioModel>
    update(userId: string, audioId: string): Promise<AudioModel>
    delete(userId: string, audioId: string): Promise<void>
}