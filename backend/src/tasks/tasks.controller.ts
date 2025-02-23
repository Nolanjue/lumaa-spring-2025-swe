import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskGuard } from './task.guard';

@Controller('tasks')
@UseGuards(TaskGuard)

export class TasksController {
  constructor(private tasksService: TasksService) {}
   

  
  @Get()
  getTasks(@Request() req) {
    return this.tasksService.getTasks(req.user.sub);
  }

  @Post()
  createTask(
    @Body() body: { title: string; description: string },
    @Request() req,
  ) {
    return this.tasksService.createTask(
      body.title,
      body.description,
      req.user.sub,
    );
  }

  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body() body: { title: string; description: string; isComplete: boolean },
  ) {
    return this.tasksService.updateTask(
      Number(id),
      body.title,
      body.description,
      body.isComplete,
    );
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(Number(id));
  }
}