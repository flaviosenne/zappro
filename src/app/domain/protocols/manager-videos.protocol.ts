import { Video } from '../../infra/entities/video';

export interface ManageVideoProtocol {
    save(video: Video, userId: string): Promise<Video>
    listAll(userId: string): Promise<Video[]>
    findByIdAndByUserId(userId: string, VideoId: string): Promise<Video>
    update(userId: string, videoId: string): Promise<Video>
    delete(userId: string, videoId: string): Promise<void>
}