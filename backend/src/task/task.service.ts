import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { createSlugFromText } from 'src/common/utils/create-slug-from-text';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto, author: User) {
    const newTask = this.taskRepository.create({
      slug: createSlugFromText(dto.title),
      title: dto.title,
      content: dto.content,
      priority: dto.priority,
      author,
    });

    const created = await this.taskRepository
      .save(newTask)
      .catch((err: unknown) => {
        if (err instanceof Error) {
          this.logger.error('Erro ao criar task', err.stack);
        }
        throw new BadRequestException('Erro ao criar tarefa');
      });

    return created;
  }

  async findAllTask(author: User) {
    const tasks = await this.taskRepository.find({
      where: {
        author: { id: author.id },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });

    return tasks;
  }

  async findTaskById(taskId: string, author: User) {
    return await this.taskRepository.findOne({
      where: {
        id: taskId,
        author: { id: author.id },
      },
      relations: ['author'],
    });
  }

  async findAllTaskByStatus(done: boolean, author: User) {
    const tasks = await this.taskRepository.find({
      where: {
        done,
        author: { id: author.id },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });

    console.log('>>> filtro:', done, 'total:', tasks.length, tasks);

    return tasks;
  }

  async toogleDone(id: string, author: User) {
    const task = await this.taskRepository.findOne({
      where: { id, author: { id: author.id } },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    task.done = !task.done;
    return this.taskRepository.save(task);
  }

  async findOneOrFail(taskData: Partial<Task>, author: User) {
    const task = await this.taskRepository.findOne({
      where: {
        ...taskData,
        author: { id: author.id },
      },
      relations: ['author'],
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return task;
  }

  async update(taskData: Partial<Task>, dto: UpdateTaskDto, author: User) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('Dados não enviados');
    }

    const task = await this.findOneOrFail(taskData, author);

    task.title = dto.title ?? task.title;
    task.content = dto.content ?? task.content;
    task.priority = dto.priority ?? task.priority;
    task.done = dto.done ?? task.done;

    return this.taskRepository.save(task);
  }

  async remove(taskData: Partial<Task>, author: User) {
    const task = await this.findOneOrFail(taskData, author);
    await this.taskRepository.delete({
      ...taskData,
      author: { id: author.id },
    });

    return task;
  }
}
