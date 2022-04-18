import { Audio } from '../../../infra/entities/audio';
import { Video } from './../../../infra/entities/video';

type VideoResponse = {
    id: number
    createdAt: Date
    updatedAt: Date
    extension: string
    content: Buffer
    name: string
    size: string
    user: { id: number }
}

export class VideoDto {
    static of(file: any) {
        const video = new Video()

        video.content = file
        video.createdAt = new Date()
        video.updatedAt = new Date()
        video.name = file.filename
        video.extension = file.originalname.split('.')[1]
        video.size = file.size

        return video
    }

    static ofResponse(videos: Video[]): VideoResponse[] {
        return videos.map(video => {
            return {
                id: video.id,
                content: video.content,
                createdAt: video.createdAt,
                updatedAt: video.updatedAt,
                name: video.name,
                extension: video.extension,
                size: video.size,
                user: { id: video.user.id }
            }
        })
    }
}