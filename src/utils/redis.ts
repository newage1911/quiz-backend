import IORedis from 'ioredis'

const redis = new IORedis("redis://localhost:6379")
export const initRedis = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    redis.on('connect', () => {
      resolve(redis)
    })

    redis.on('error', (err: any) => {
      reject(err)
    })
  })
}

export const getRedis = () => {
  return redis
}