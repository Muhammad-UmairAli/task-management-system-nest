import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // Create a new task and save it to the database
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status, project } = createTaskDto;

    const newTask = this.taskRepository.create({
      title,
      description,
      status,
      // project, // Optional, depending on your use case
    });

    return await this.taskRepository.save(newTask);
  }

  // Find all tasks in the database
  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  // Find a single task by ID
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  // Update an existing task by ID
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);  // First, fetch the task

    // Update the task fields if provided
    task.title = updateTaskDto.title ?? task.title;
    task.description = updateTaskDto.description ?? task.description;
    task.status = updateTaskDto.status ?? task.status;
    // task.project = updateTaskDto.project ?? task.project;

    // Save the updated task to the database
    return await this.taskRepository.save(task);
  }

  // Delete a task by ID
  async delete(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
