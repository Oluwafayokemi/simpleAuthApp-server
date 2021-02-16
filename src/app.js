import express from 'express'
import bodyParser from 'body-parser'
// import cors from 'cors'
import morgan from 'morgan'
// import compression from 'compression'
import helmet from 'helmet'
import { userRouter } from './routes'
import { connectDb } from './models'

const PORT = parseInt(process.env.PORT, 10) || 9000
const app = express()
const isProduction = process.env.NODE_ENV === 'production'

// app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(userRouter)
// app.use(compression()); //Compress all routes
app.use(helmet());

app.set('trust proxy', true)
//https debug
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('*', (req, res) => {
  res.status(200).json('Welcome !!!')
})

app.use((req, res, next) => {
  const err = res.status(404).send({
    error: '404: Sorry Page Not Found!'
  })
  next(err)
})

connectDb()

app.listen(PORT, () => {
  console.log(`Server is running on isProductionss => ${isProduction}`)
  console.log(`Server is running on PORT ${PORT}`)
})

export default app
