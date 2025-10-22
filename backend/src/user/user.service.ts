import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dot';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async failIfNameExists(name: string, currentUserId?: string) {
    const exists = await this.userRepository.findOneBy({ name });

    if (exists && exists.id !== currentUserId) {
      throw new ConflictException('Nome de usuário já existe');
    }
  }

  async findOneByOrFail(userDate: Partial<User>) {
    const user = await this.userRepository.findOneBy(userDate);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    await this.failIfNameExists(dto.name);

    const hashedPassword = await this.hashingService.hash(dto.password);

    const newUser: CreateUserDto = {
      name: dto.name,
      password: hashedPassword,
    };

    const created = await this.userRepository.save(newUser);
    return created;
  }

  findByName(name: string) {
    return this.userRepository.findOneBy({ name });
  }

  findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateUserDto) {
    if (!dto.name) {
      throw new BadRequestException('Dados não enviados');
    }

    const user = await this.findOneByOrFail({ id });

    user.name = dto.name ?? user.name;

    await this.failIfNameExists(dto.name, user.id);

    return this.save(user);
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    const user = await this.findOneByOrFail({ id });

    const isCurrentPasswordValid = await this.hashingService.compare(
      dto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Senha atual inválida');
    }

    user.password = await this.hashingService.hash(dto.newPassword);
    user.forceLogout = true;

    return this.save(user);
  }

  async remove(id: string) {
    const user = await this.findOneByOrFail({ id });

    await this.userRepository.delete({ id });
    return user;
  }

  save(user: User) {
    return this.userRepository.save(user);
  }
}
