import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

export const tmpFolder = path.resolve(__dirname, "..", "..", "tmp")


const multerDiskConfig = multer.diskStorage({
  destination: tmpFolder,

  filename(request, file, callback) {
    const filehash = crypto.randomBytes(10).toString('hex')
    const filename = `${filehash}-${file.originalname}`.replace(' ', '_')

    return callback(null, filename)
  }
})

export const multerUpload = multer({ storage: multerDiskConfig })