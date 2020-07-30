import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from '../user/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from '../user/user.repository';
import {JwtService} from '@nestjs/jwt';
import {RegisterDto} from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import {LoginDto} from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: UserRepository,
              private readonly jwtService: JwtService) {
  }

  public async register(dto: RegisterDto): Promise<User> {
    const user = await this.userRepository.findOne({email: dto.email});
    if (user) throw new BadRequestException(`User with email '${dto.email}' already exists`);
    dto.password = await this.encodePassword(dto.password);
    return this.userRepository.save(dto);
  }

  public async login(dto: LoginDto): Promise<{token: string}> {
    const user = await this.userRepository.findOne({email: dto.email});
    if (!user) throw new BadRequestException(`Incorrect email`);
    const isPassCorrect = await bcrypt.compare(dto.password, user.password);
    if (!isPassCorrect) throw new BadRequestException('Incorrect password');
    return {token: this.jwtService.sign({sub: user.id})};
  }

  public validateUser(id: string): Promise<User> {
    return this.userRepository.findOneOrFail(id)
      .catch(() => {
        throw new UnauthorizedException();
      });
  }

  private async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
