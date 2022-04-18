import { Router } from "express"
import multer from 'multer';

import { multerConfig } from '../../infra/config/multer';
import { logged } from '../../infra/midlewares/auth';
import { VideosFactory } from './../factories/videos.factory';

const videosRoutes = Router()

const video = VideosFactory.getManageVideoControllerInstance()

videosRoutes.post('/videos', logged, multer(multerConfig).single('video'), video.save.bind(video))
videosRoutes.get('/videos', logged, multer(multerConfig).single('video'), video.findAll.bind(video))
videosRoutes.delete('/videos/:id', logged, multer(multerConfig).single('video'), video.delete.bind(video))


export { videosRoutes }