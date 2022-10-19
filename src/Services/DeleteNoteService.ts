import { prisma } from '../database/prisma'
import { AppError } from '../Errors/AppError'

type DeleteNoteServiceParams = {
	id: string
}

export class DeleteNoteService {
	async execute({ id }: DeleteNoteServiceParams) {
		try {
			await prisma.note.delete({
				where: {
					id
				}
			})
		} catch {
			throw new AppError('Note not found.', 404)
		}
	}
}