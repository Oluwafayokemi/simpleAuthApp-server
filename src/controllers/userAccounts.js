/* eslint-disable class-methods-use-this */
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import decodeToken from '../middleware/auth'
import { userModel } from '../models'
import httpStatus from '../utils/httpStatus'
import { email } from '../utils/emailSender'

dotenv.config()

const user = {}

email.verifyConnection()

user.register = async (req, res, next) => {
  userModel
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(httpStatus.CONFLICT).json({
          message: 'Email already exist'
        })
      } else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          console.log(hash)
          if (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
              error: err
            })
          } else {
            const newUser = await userModel.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              dateOfBirth: req.body.dateOfBirth,
              password: hash
            })
           await email.sendMessage(req.body)
            let { password, __v, ...user } = newUser.toObject()
            return res.status(httpStatus.CREATED).json({ data: { user } })
          }
        })
      }
    })
}

// Login user
user.login = async (req, res, next) => {
  userModel
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          message: 'User not Found'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(httpStatus.UNAUTHORIZED).json({
            message: 'Email/password is incorrect'
          })
        }
        if (result) {
          const token = decodeToken(user[0].email, user[0].id)
          return res.status(httpStatus.OK).json({
            message: `Login successful for ${user[0].email}`,
            token: token
          })
        }
        res.status(httpStatus.UNAUTHORIZED).json({
          message: 'Auth failed'
        })
      })
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: err
      })
    })
}

export { user }
