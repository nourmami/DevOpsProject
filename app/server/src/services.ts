import Meme from './model'

export const createMeme = async (
  title: string,
  description: string,
  image: string
) => {
  const meme = new Meme()
  meme.title = title
  meme.description = description
  meme.image = image
  meme.date = new Date()
  await meme.save()
  return meme
}

export const getMemes = async () => {
  return await Meme.find({
    where: {
      verified: true,
    },
    order: {
      date: 'DESC',
    },
  })
}

export const verify = async (id: number) => {
  const meme = await Meme.findOne({
    where: {
      id,
    },
  })
  if (meme) {
    meme.verified = true
    await meme.save()
    return meme
  }
}
