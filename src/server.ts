import mongoose from 'mongoose'

import config from './config'
import { app } from './app'
import { logger, errorLogger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error(err)
  }
}
main()

// WTmnWMKdbyhHlE5d
// university-management
