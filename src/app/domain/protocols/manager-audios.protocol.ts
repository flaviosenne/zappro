import { Audio } from "../../infra/entities/audio";

export interface ManageAudioProtocol {
    save(audio: Audio, userId: number): Promise<Audio>
    listAll(userId: number): Promise<Audio[]>
    findByIdAndByUserId(userId: number, audioId: number): Promise<Audio>
    update(userId: number, audioId: number): Promise<Audio>
    delete(userId: number, audioId: number): Promise<void>
}