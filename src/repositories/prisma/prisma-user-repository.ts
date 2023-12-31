import prisma from "../../lib/prisma";
import { $Enums, Prisma } from "@prisma/client";
import { UserRepository } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })
        return user
    }

    async getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }

    async getUserByUsername(username: string) {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })
        return user
    }

    async getUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    }

    async getAllUsers() {
        const users = await prisma.user.findMany({
            where: {
                status: 1
            }
        })

        return users
    }

    async editUser(id: string, email: string, username: string) {
        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                email,
                username
            }
        })

        return user
    }

    async deleteUser(id: string) {
        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                status: 0
            }
        })

        return user
    }

    async updateImage(id: string, image: string) {
        const userImageUpdated = await prisma.user.update({
            where: {
                id
            },
            data: {
                image
            }
        })

        return userImageUpdated
    }
}