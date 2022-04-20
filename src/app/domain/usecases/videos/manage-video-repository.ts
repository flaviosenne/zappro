import { Video } from './../../../infra/entities/video';

export interface ManageVideoRepository {
    save(video: Video): Promise<Video>
    findAll(userId: string): Promise<Video[]>
    findByIdAndByUserId(userId: string, videoId: string): Promise<Video>
    update(userId: string, videoId: string): Promise<Video>
    delete(userId: string, videoId: string): Promise<void>
}