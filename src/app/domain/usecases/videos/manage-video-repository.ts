import { Video } from './../../../infra/entities/video';

export interface ManageVideoRepository {
    save(video: Video): Promise<Video>
    findAll(userId: number): Promise<Video[]>
    findByIdAndByUserId(userId: number, videoId: number): Promise<Video>
    update(userId: number, videoId: number): Promise<Video>
    delete(userId: number, videoId: number): Promise<void>
}