import { Router } from 'express'
import { NotesController } from '../../controllers/NotesController'
import { createNoteSchema } from '../../dtos/createNoteSchema'
import { updateNoteSchema } from '../../dtos/updateNoteSchema'
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated'
import { validateSchema } from '../../middlewares/validateSchema'
import { noteTodosRouter } from './noteTodos.routes'

export const notesRouter = Router()

const notesController = new NotesController()

notesRouter.use(ensureAuthenticated)

notesRouter.get('/', notesController.index)

notesRouter.get('/:id', notesController.show)

notesRouter.post('/', validateSchema(createNoteSchema), notesController.create)

notesRouter.put('/:id', validateSchema(updateNoteSchema), notesController.update)

notesRouter.delete('/:id', notesController.delete)

notesRouter.use('/:noteId/todos', noteTodosRouter)


