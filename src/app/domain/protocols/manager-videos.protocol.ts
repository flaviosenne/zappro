import { Video } from '../../infra/entities/video';

export interface ManageVideoProtocol {
    save(video: Video, userId: number): Promise<Video>
    listAll(userId: number): Promise<Video[]>
    findByIdAndByUserId(userId: number, VideoId: number): Promise<Video>
    update(userId: number, videoId: number): Promise<Video>
    delete(userId: number, videoId: number): Promise<void>
}