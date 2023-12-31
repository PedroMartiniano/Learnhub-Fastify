import { Prisma, Tasks } from "@prisma/client";

export interface TasksRepository {
    createTask(data: Prisma.TasksUncheckedCreateInput): Promise<Tasks>
    getTaskById(id: string): Promise<Tasks | null>
    deleteTaskById(id: string): Promise<Tasks | null>
    getTaskByIdModule(id_module: string): Promise<Tasks[] | null>
}