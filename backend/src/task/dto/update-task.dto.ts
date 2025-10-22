import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Priority } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(
  PickType(CreateTaskDto, ['content', 'title']),
) {
  @IsOptional() // Vai depender da lógica que criarmos no service ou no Next.js
  @IsBoolean({ message: 'Campo de tarefa feita precisa ser boolean' })
  done?: boolean;

  @IsOptional()
  @IsEnum(Priority, {
    message: 'Priority precisa ser: Eventual, Normal ou Urgente',
  })
  priority?: Priority;
}
