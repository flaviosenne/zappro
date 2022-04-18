import cors from 'cors'
import { json } from 'express'

import { routes } from '../../presentation/routes'
import { server } from '../server/express'
import { corsConfig } from './cors';

server.use(cors(corsConfig))
server.use(json({ limit: '5mb' }))
server.use(routes)

export default server