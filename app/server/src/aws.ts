import aws from 'aws-sdk'
import { v4 } from 'uuid'
import multer from 'multer'
import multerS3 from 'multer-s3'

const s3 = new aws.S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'niemands-bucket',
    metadata: function (req, file, cb) {
      cb(null, {})
    },
    key: function (req, file, cb) {
      cb(null, `memes/${v4()}.${file.mimetype.split('/')[1]}`)
    },
  }),
})
