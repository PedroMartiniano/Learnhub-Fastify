import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { UserClass } from "../../use-cases/user"
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository"
import { AppError } from "../../errors/AppError"
import { User } from "@prisma/client"
import { makeUserUseCase } from "../../use-cases/factory/make-user-use-case"

export const createUserController = async (request: FastifyRequest, reply: FastifyReply) => {

    const userSchema = z.object({
        email: z.string().email(),
        username: z.string(),
        password: z.string().min(7)
    })

    const { email, username, password } = userSchema.parse(request.body)

    const createUser = makeUserUseCase()

    try {
        await createUser.executeCreateUser({ email, username, password })
    } catch (e) {
        throw new AppError(`Algo deu errado`, 409)
    }

    return reply.status(201).send('created')
}

export const getUserByIdController = async (req: FastifyRequest, rep: FastifyReply) => {
    const userSchema = z.object({
        id: z.string()
    })

    const { id } = userSchema.parse(req.params)

    const getUserById = makeUserUseCase()

    let user
    try {
       user = await getUserById.executeGetUserById(id)
    } catch (e) {
        throw new AppError(`Algo deu errado`, 409)
    }
    return rep.status(200).send(user)
}