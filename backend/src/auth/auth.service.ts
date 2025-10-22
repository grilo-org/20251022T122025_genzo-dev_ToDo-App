import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { HashingService } from 'src/common/hashing/hashing.service';
import { JwtPayload } from './types/jwt-payload.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByName(loginDto.name);
    const error = new UnauthorizedException('Usuário ou senha inválidos');

    if (!user) {
      throw error;
    }

    const isPasswordValid = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw error;
    }

    const JwtPayload: JwtPayload = {
      username: user.name,
      sub: user.id,
    };

    const accessToken = await this.jwtService.signAsync(JwtPayload);

    user.forceLogout = false;
    await this.userService.save(user);

    return { accessToken };
  }
}
