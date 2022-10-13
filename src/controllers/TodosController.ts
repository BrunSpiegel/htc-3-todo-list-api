import { Request, Response } from "express"

export class TodosController {
  async show(request: Request, response: Response): Promise<Response> {
      return response.json({})
  }
  async update(request: Request, response: Response): Promise<Response> {
    return response.json({})
}
}