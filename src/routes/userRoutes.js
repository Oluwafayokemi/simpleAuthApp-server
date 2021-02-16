import express from 'express'
import { user } from '../controllers/userAccounts'
import { validation } from '../middleware/validate'

const userRouter = express.Router()

userRouter
  .post('/api/v1/auth/signup', validation.register, user.register)
  .post('/api/v1/auth/login', validation.login, user.login)

export { userRouter }
