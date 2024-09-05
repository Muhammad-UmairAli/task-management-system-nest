import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.idCounter++, // Auto-increment ID
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    task.title = updateTaskDto.title ?? task.title;
    task.description = updateTaskDto.description ?? task.description;
    return task;
  }

  delete(id: number): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
  }
}
