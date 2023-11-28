import { DataSource, DataSourceOptions } from 'typeorm'
import { ErrorRequestHandler, RequestHandler } from 'express'
import model from './model'
import Redis from 'ioredis'
import { verify } from './services'
const env = (key: string) => {
  const value = process.env[key]
  if (!value) {
    return ''
  }
  return value
}

export const connect = async () => {
  console.log('password', env('DATABASE_PASSWORD'))
  const config: DataSourceOptions = {
    type: 'postgres',
    host: env('DATABASE_HOST'),
    port: Number(env('DATABASE_PORT')),
    username: env('DATABASE_USERNAME'),
    password: env('DATABASE_PASSWORD'),
    database: env('DATABASE_NAME'),
    entities: [model],
    synchronize: true,
    logging: false,
  }
  const dataSource = new DataSource(config)
  await dataSource.initialize().then(() => console.log('database connected'))
}

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.log(err)
  return res.json({
    error: err.message,
    status: 500,
  })
}

export const chainWithRedis = async () => {
  const config = {
    host: env('REDIS_HOST'),
    port: Number(env('REDIS_PORT')),
  }

  const pub = new Redis(config)

  const publish = async (id: number) => {
    console.log('requested a verification for ', id)
    await pub.publish('meme:created', id.toString())
  }

  const mw: RequestHandler = async (req: any, res, next) => {
    req.publish = publish
    next()
  }

  return mw
}
