import mongoose from 'mongoose'
// import Server from 'http'
// import Server from 'http'
import config from './config'
import { app } from './app'
import { logger, errorLogger } from './shared/logger'
// import { log } from 'winston'

process.on('uncaughtException', err => {
  errorLogger.error(err)
  process.exit(1)
})
let server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error(err)
  }

  process.on('unhandledRejection', error => {
    // console.log('unhandle rejection')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
main()

// console.log(x)

process.on('SIGTERM', () => {
  logger.info('sigterm is recevied')
  if (server) {
    server.close()
  }
})

// WTmnWMKdbyhHlE5d
// university-management
