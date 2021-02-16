/* eslint-disable class-methods-use-this */
import Validator from 'validatorjs'

const validation = {}

/**
 * Validate Sign up record
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {function} next
 * @returns {object} Class instance
 * @memberof Validation
 */
validation.register = (req, res, next) => {
  const registerSchema = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    dateOfBirth: 'date',
    password: 'required|string|min:5|max:10'
  }

  const validate = new Validator(req.body, registerSchema)
  if (validate.passes()) return next()

  const error = {}
  const firstName = validate.errors.first('firstName')
  const lastName = validate.errors.first('lastName')
  const email = validate.errors.first('email')
  const dateOfBirth = validate.errors.first('dateOfBirth')
  const password = validate.errors.first('password')

  if (firstName) {
    error.firstName = firstName
  }
  if (lastName) {
    error.lastName = lastName
  }
  if (email) {
    error.email = email
  }
  if (dateOfBirth) {
    error.dateOfBirth = dateOfBirth
  }
  if (password) {
    error.password = password
  }

  return res.status(400).send({
    message: 'Invalid Input',
    status: 400,
    error
  })
}

validation.login = (req, res, next) => {
  const loginSchema = {
    email: 'required|email',
    password: 'required|string|min:5|max:20'
  }

  const validate = new Validator(req.body, loginSchema)
  if (validate.passes()) return next()

  let error = {}
  const email = validate.errors.first('email')
  const password = validate.errors.first('password')

  if (!email && !password) {
    error = 'The email and password fields are required'
  } else if (email) {
    error.email = email
  } else if (password) {
    error.password = password
  }

  return res.status(400).json({
    message: 'Invalid Input',
    status: 400,
    error
  })
}

export { validation }
