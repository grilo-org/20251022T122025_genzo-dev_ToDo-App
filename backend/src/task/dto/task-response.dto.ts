import { Priority, Task } from '../entities/task.entity';

export class TaskResponseDto {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly content: string;
  readonly done: boolean;
  readonly priority: Priority;
  readonly createdAt: Date;
  readonly author: {
    id: string;
    name: string;
  };

  constructor(task: Task) {
    this.id = task.id;
    this.slug = task.slug;
    this.title = task.title;
    this.content = task.content;
    this.done = task.done;
    this.priority = task.priority;
    this.createdAt = task.createdAt;
    this.author = {
      id: task.author.id,
      name: task.author.name,
    };
  }
}
