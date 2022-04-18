import crypto from 'crypto'
import { Request } from 'express';
import { diskStorage, Options } from 'multer'
import { resolve } from 'path';

import { BadRequest } from '../../domain/exceptions/bad-request';
import { TEMP_DIR } from './variables-global';

const storageTypes = {
    local: diskStorage({
        destination: (req: Request, _, callback) => {
            callback(null, resolve(TEMP_DIR))
        },
        filename: (req: Request, file: any, callback: Function) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) callback(err)

                file.key = `${hash.toString('hex')}-${file.originalname}`

                callback(null, file.key)
            })
        },
    })
}

export const multerConfig: Options = {
    dest: resolve(TEMP_DIR),
    storage: storageTypes.local,
    // limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req: Request, file: any, callback: Function) => {
        const allowedMimes = [
            'audio/ogg',
            'audio/mp3',
            'video/mp4'
        ]

        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(new BadRequest('invalid file type'))
        }
    }
}