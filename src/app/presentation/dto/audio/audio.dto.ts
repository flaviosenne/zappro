import { Audio } from './../../../infra/entities/audio';

type AudioResponse = {
    id: number
    createdAt: Date
    updatedAt: Date
    extension: string
    content: Buffer
    name: string
    size: string
    user: { id: number }
}

export class AudioDto {
    static of(file: any) {
        const audio = new Audio()

        audio.content = file
        audio.createdAt = new Date()
        audio.updatedAt = new Date()
        audio.name = file.filename
        audio.extension = file.originalname.split('.')[1]
        audio.size = file.size

        return audio
    }

    static ofResponse(audios: Audio[]): AudioResponse[] {
        return audios.map(audio => {
            return {
                id: audio.id,
                content: audio.content,
                createdAt: audio.createdAt,
                updatedAt: audio.updatedAt,
                name: audio.name,
                extension: audio.extension,
                size: audio.size,
                user: { id: audio.user.id }
            }
        })
    }
}