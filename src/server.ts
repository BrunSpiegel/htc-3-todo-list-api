import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', function (request, response) {
  response.json({ message: 'Hello World!' })
})

app.use('/', routes)

app.listen(3333, function () {
  console.log('🚀 Server Started!')
})
