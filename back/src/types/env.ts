export interface BackEnv {
  COOKIE_SECRET: string
  DATABASE_URL: string
  MAILJET_SECRETS: string[]
  NODE_ENV: string
  PORT: number
}
