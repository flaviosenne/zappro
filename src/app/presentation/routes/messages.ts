import { Router } from "express"

import { logged } from '../../infra/midlewares/auth';
import { MessagesFactory } from '../factories/messages.factory';

const messageRoutes = Router()

const message = MessagesFactory.getManageMessageControllerInstance()

messageRoutes.post('/messages', logged, message.save.bind(message))
messageRoutes.get('/messages', logged, message.findAll.bind(message))
messageRoutes.get('/messages/:id', logged, message.findById.bind(message))
messageRoutes.delete('/messages/:id', logged, message.delete.bind(message))


export { messageRoutes }