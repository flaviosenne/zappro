import { Router } from "express"

import { audioRoutes } from "./audios"
import { messageRoutes } from "./messages"
import { paymentRoutes } from "./payment"
import { userRoutes } from "./user-account"
import { videosRoutes } from "./videos"

const routes = Router()

routes.use(userRoutes)
routes.use(messageRoutes)
routes.use(audioRoutes)
routes.use(videosRoutes)
routes.use(paymentRoutes)

export { routes }