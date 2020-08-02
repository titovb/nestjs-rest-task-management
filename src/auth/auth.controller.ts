import {Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {AuthService} from './auth.service';
import {RegisterDto} from './dto/register.dto';
import {UserEntity} from '../user/user.entity';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  public login(@Body() dto: LoginDto): Promise<{token: string}> {
    return this.authService.login(dto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  public register(@Body() dto: RegisterDto): Promise<UserEntity> {
    return this.authService.register(dto);
  }
}
