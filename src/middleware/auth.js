import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const secret = process.env.SECRET_KEY

const decodeToken = user => {
  const { userid, email } = user
  const userDetails = { userid, email }
  const authToken = jwt.sign(userDetails, secret, { expiresIn: '1d' })
  return authToken
}

export default decodeToken
