import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  // eslint-disable-next-line no-undef
  database_url: process.env.DATABASE_URL,
  // eslint-disable-next-line no-undef
  default_user_pass: process.env.DEFAULT_USER_PASS,
}
