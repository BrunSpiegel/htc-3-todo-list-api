import { Request, Response } from "express";
import { CreateNoteService } from "../Services/CreateNoteService";
import { DeleteNoteService } from "../Services/DeleteNoteService";
import { ListNotesService } from "../Services/ListNotesService";
import { ShowNoteService } from "../Services/ShowNoteService";
import { UpdateNoteService } from "../Services/UpdateNoteService";

export class NotesController {
  async index(request: Request, response: Response): Promise<Response> {
    const listNotes = new ListNotesService();

    const userId = request.user.id;

    const notes = await listNotes.execute({ userId });

    return response.json(notes);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userId = request.user.id;

    const showNote = new ShowNoteService();

    const note = await showNote.execute({ id, userId });

    return response.json(note);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { title, text, todos } = request.body;

    const userId = request.user.id;

    const createNote = new CreateNoteService();

    const note = await createNote.execute({ title, text, todos, userId });

    return response.status(201).json(note);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, text } = request.body;

    const updateNote = new UpdateNoteService();

    const note = await updateNote.execute({ id, title, text });

    return response.json(note);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteNote = new DeleteNoteService();

    await deleteNote.execute({ id });

    return response.send();
  }
}
