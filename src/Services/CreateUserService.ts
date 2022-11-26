import { hash } from "bcryptjs"

import { prisma } from "../database/prisma"
import { AppError } from "../Errors/AppError"

interface CreateUserServiceParams {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  async execute({ name, email, password}: CreateUserServiceParams) {
    const checkUserExists = await prisma.user.findFirst({
      where: {
        email,
      }
    })

    if (checkUserExists) {
      throw new AppError("E-mail address already used.")
    }

    const hashedPassword = await hash(password, 8)

    const { password: _, ...user } = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    return user
  }
}