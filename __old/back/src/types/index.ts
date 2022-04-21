export * from './env'

declare module 'express-session' {
  interface SessionData {
    userId: number,
  }
}