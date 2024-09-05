// src/tasks/tasks.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() response) {
    const { title, description } = createTaskDto;
    if (!title || !description) {
      response.status(400).json({ message: 'Missing required fields' });
      return;
    }
    try {
      const createdTask = await this.tasksService.create(createTaskDto);
      return response.status(201).json(createdTask);
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(Number(id), updateTaskDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(Number(id));
  }
}
