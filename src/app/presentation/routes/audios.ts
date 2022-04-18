import { Router } from "express"
import multer from 'multer';

import { logged } from '../../infra/midlewares/auth';
import { multerConfig } from './../../infra/config/multer';
import { AudiosFactory } from './../factories/audios.factory';

const audioRoutes = Router()

const audio = AudiosFactory.getManageAudioControllerInstance()

audioRoutes.post('/audios', logged, multer(multerConfig).single('audio'), audio.save.bind(audio))
audioRoutes.get('/audios', logged, multer(multerConfig).single('audio'), audio.findAll.bind(audio))
audioRoutes.delete('/audios/:id', logged, multer(multerConfig).single('audio'), audio.delete.bind(audio))


export { audioRoutes }