import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'

import { routes } from './routes'
import { AppError } from './Errors/AppError'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', function (request, response) {
  response.json({ message: 'Hello World!' })
})

app.use('/', routes)

app.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    console.log(err)
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ error: true, message: err.message })
    }

    return response
      .status(500)
      .json({ error: true, message: "Internal Server Error." })
  }
)

app.listen(3333, function () {
  console.log('🚀 Server Started!')
})
