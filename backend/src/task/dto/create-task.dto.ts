import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { Priority } from '../entities/task.entity';

export class CreateTaskDto {
  @IsString({ message: 'Título precisa ser uma string' })
  @IsNotEmpty({ message: 'Título não pode ficar vazio' })
  @Length(5, 50, { message: 'Título precisa ter entre 5 e 50 caracteres' })
  title: string;

  @IsString({ message: 'Conteúdo precisa ser uma string' })
  @IsNotEmpty({ message: 'Conteúdo não pode ficar vazio' })
  @MinLength(10, { message: 'Conteúdo precisa ter pelos menos 10 caracteres' })
  content: string;

  @IsOptional()
  @IsEnum(Priority, {
    message: 'Priority precisa ser: Eventual, Normal ou Urgente',
  })
  priority?: Priority;
}
