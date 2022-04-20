import { Audio } from "../../infra/entities/audio";

export interface ManageAudioProtocol {
    save(audio: Audio, userId: string): Promise<Audio>
    listAll(userId: string): Promise<Audio[]>
    findByIdAndByUserId(userId: string, audioId: string): Promise<Audio>
    update(userId: string, audioId: string): Promise<Audio>
    delete(userId: string, audioId: string): Promise<void>
}