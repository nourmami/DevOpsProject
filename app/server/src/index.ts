import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import morgan from 'morgan'
import routes from './routes'
import { connect, errorHandler, chainWithRedis } from './utils'

connect()
  .then(chainWithRedis)
  .then(mw => {
    const app = express()

    app.use(mw)
    app.use(cors())
    app.use(json())
    app.use(morgan('dev'))

    app.use('/v1', routes)

    app.use(errorHandler)
    app.listen(5050, () => console.log('listening on port 5050'))
  })
