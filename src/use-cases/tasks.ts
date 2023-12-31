import { Prisma, Tasks } from "@prisma/client";
import { TasksRepository } from "../repositories/tasks-repository";

export class TasksClassUseCase {
    constructor(private tasksRepository: TasksRepository) { }

    async executeCreateTasks(data: Prisma.TasksUncheckedCreateInput): Promise<Tasks> {
        const task = await this.tasksRepository.createTask(data)

        return task
    }

    async executeGetTaskById(id: string): Promise<Tasks | null> {
        const task = await this.tasksRepository.getTaskById(id)

        return task
    }

    async executeDeleteTaskById(id: string): Promise<Tasks | null> {
        const task = await this.tasksRepository.getTaskById(id)

        return task
    }

    async getTaksByIdModule(id_module: string): Promise<Tasks[] | null> {
        const tasks = await this.tasksRepository.getTaskByIdModule(id_module)

        return tasks
    }
}