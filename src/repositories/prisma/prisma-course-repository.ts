import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";
import { CourseRepository } from "../course-repository";

export class PrismaCourseRepository implements CourseRepository {
    async create(data: Prisma.CourseCreateInput) {
        const course = await prisma.course.create({
            data
        })
        return course
    }

    async getCourseById(id: string){
        const course = await prisma.course.findUnique({
            where: {
                id
            }
        })
        return course
    }
}