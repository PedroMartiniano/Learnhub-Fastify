import { Module } from "@prisma/client";
import { ModuleRepository } from "../repositories/module-repository";
import { CourseRepository } from "../repositories/course-repository";
import { AppError } from "../errors/AppError";

type ModuleRequest = {
    name: string,
    description: string,
    id_course: string
}

export class ModuleClassUseCase {
    constructor(private moduleRepository: ModuleRepository, private courseRepository: CourseRepository) { }

    async executeCreateModule({ name, description, id_course }: ModuleRequest): Promise<Module> {
        const getCourseById = await this.courseRepository.getCourseById(id_course)

        if (!getCourseById) {
            throw new AppError(`Course dont exist`)
        }

        const moduleCreate = await this.moduleRepository.createModule({ name, description, id_course })

        return moduleCreate
    }

    async executeGetModuleById(id: string): Promise<Module | null> {
        const moduleGet = await this.moduleRepository.getModuleById(id)

        if (!moduleGet) return null

        return moduleGet
    }

    async executeEditModule(id: string, name: string, description: string): Promise<Module> {
        const moduleEdited = await this.moduleRepository.editModule(id, name, description)

        return moduleEdited
    }

    async executeDeleteModulesByCourse(id_course: string): Promise<boolean> {
        const modulesEdited = await this.moduleRepository.deleteModuleByCourse(id_course)

        return modulesEdited
    }
}