import { Request, Response } from "express"
import { prisma } from "../database/prisma"
import { AppError } from "../Errors/AppError"
import { CreateNoteService } from "../Services/CreateNoteService"
import { ListNotesService } from "../Services/ListNotesService"
import { ShowNoteService } from "../Services/ShowNoteService"

export class NotesController {
  async index(request: Request, response: Response): Promise<Response> {
    const listNotes = new ListNotesService()

    const notes = await listNotes.execute()


    return response.json(notes)
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params


    const showNote = new ShowNoteService()

      const note = await showNote.execute({ id })

      return response.json(note)
    
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { title, text, todos } = request.body

    const createNote = new CreateNoteService()

      const note = await createNote.execute({ title, text, todos })

      return response.status(201).json(note)
    
  }

  async update(request: Request, response: Response): Promise<Response> { 
    // TODO PUT
    return response.json({})
  }

  async delete(request: Request, response: Response): Promise<Response> { 
    // TODO Delete
    return response.json({})
  }
}