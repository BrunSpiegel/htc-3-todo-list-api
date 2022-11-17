import { NextFunction, Request, Response } from "express";
import path from "path";
import fs from 'fs'

import { multerUpload, tmpFolder, uploadsFolder } from "../config/multer";
import { AppError } from "../Errors/AppError";
import { prisma } from "../database/prisma";

export const uploadImage = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const multerHandler = multerUpload.single("image")

  multerHandler(request, response, async() => {
  if (!request.file) {
    throw new AppError('Error uploading file.')
  }

  const { filename } = request.file

  const image = await prisma.image.create({
    data: {
      filename
    }
  }) 

  fs.renameSync(
    path.resolve(tmpFolder, filename),
    path.resolve(uploadsFolder, filename)
  )

  request.uploadedImage = { url: `http://localhost:3333/public/${filename}`, ...image }

    next()
  })
}
