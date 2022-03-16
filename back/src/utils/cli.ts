const prefix = '>>'

export const log = {
  msg: (text: string) => {
    console.log(`${prefix} ${text}`)
  },
  warn: (text: string) => {
    console.warn(`${prefix} ${text}`)
  },
  error: (text: string) => {
    console.error(text)
  }
}
