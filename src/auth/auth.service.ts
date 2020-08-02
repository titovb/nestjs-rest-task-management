import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserEntity} from '../user/user.entity';
import {JwtService} from '@nestjs/jwt';
import {RegisterDto} from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import {LoginDto} from './dto/login.dto';
import {UserService} from '../user/user.service';
import {LoginResDto} from './dto/login-res.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
              private readonly jwtService: JwtService) {
  }

  public async register(dto: RegisterDto): Promise<UserEntity> {
    const user = await this.userService.getOneByEmail(dto.email);
    if (user) throw new BadRequestException(`User with email '${dto.email}' already exists`);
    dto.password = await this.encodePassword(dto.password);
    return this.userService.create(new UserEntity(dto));
  }

  public async login(dto: LoginDto): Promise<LoginResDto> {
    const user = await this.userService.getOneByEmail(dto.email);
    if (!user) throw new BadRequestException(`Incorrect email`);
    const isPassCorrect = await bcrypt.compare(dto.password, user.password);
    if (!isPassCorrect) throw new BadRequestException('Incorrect password');
    return {token: this.jwtService.sign({sub: user.id})};
  }

  public validateUser(id: string): Promise<UserEntity> {
    return this.userService.getOneById(id)
      .catch(() => {
        throw new UnauthorizedException();
      });
  }

  private async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
