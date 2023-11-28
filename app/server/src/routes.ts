import express from 'express'
import * as services from './services'
import { upload } from './aws'

const router = express.Router()

router.post('/', upload.single('file'), async (req: any, res) => {
  const file: any = req.file
  if (!file) {
    return res.status(400).send('No file uploaded')
  }
  const { title, description } = req.body
  const image = file.location

  const meme = await services.createMeme(title, description, image)

  req.publish(meme.id)
  return res.json(meme)
})

router.get('/', async (req, res) => {
  const memes = await services.getMemes()
  return res.json(memes)
})

export default router
