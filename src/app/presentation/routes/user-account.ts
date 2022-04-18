import { Router } from "express"

import { UserFactory } from "../factories/user.factory";
import { logged } from './../../infra/midlewares/auth';

const userRoutes = Router()

const user = UserFactory.getUserControllerInstance()

userRoutes.post('/register', user.register.bind(user))
userRoutes.post('/login', user.login.bind(user))

userRoutes.get('/test', logged, (req, res) => {
    res.json({ msg: 'oi' })
})

export { userRoutes }