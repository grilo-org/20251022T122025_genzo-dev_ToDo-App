import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome precisa ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @IsString({ message: 'Senha precisa ser uma string' })
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  @MinLength(6, { message: 'Senha deve ter um mínimo de 6 caracteres' })
  password: string;
}
