import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
 
  getTasks(userId: number) {

    console.log(userId)
    return this.prisma.task.findMany({
      where: { userId: userId },
    });
  }

  createTask(title: string, description: string, userId: number) {
    return this.prisma.task.create({
      data: {
        title,
        description,
        userId,
      },
    });
  }

  updateTask(id: number, title: string, description: string, isComplete: boolean) {
    return this.prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        isComplete,
      },
    });
  }

  deleteTask(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
