import mongoose from 'mongoose'
import userModel from './user'

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connection Established')
})

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Connection Disconnected')
})

mongoose.connection.on('close', () => {
  console.log('MongoDB Connection Closed')
})

mongoose.connection.on('error', error => {
  console.log('MongoDB ERROR: ' + error)

  process.exit(1)
})

mongoose.set('debug', process.env.DATABASE_URL)

const connectDb = async () => {
  let connectionuri = process.env.DATABASE_URL

  await mongoose.connect(connectionuri, {
    autoReconnect: true,

    reconnectTries: 1000000,

    reconnectInterval: 3000,

    useNewUrlParser: true,

    useFindAndModify: true,

    useCreateIndex: true,

    useUnifiedTopology: true
  })
}

export { connectDb, userModel }

