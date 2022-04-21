import { NextApiHandler } from 'next'

const handler: NextApiHandler = (req, res) => {
  res.status(200).json('OK')
}

export default handler
