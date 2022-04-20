import { Router } from "express"

import { UserFactory } from "../factories/user.factory";

const userRoutes = Router()

const user = UserFactory.getUserControllerInstance()

userRoutes.post('/register', user.register.bind(user))
userRoutes.post('/login', user.login.bind(user))


export { userRoutes }