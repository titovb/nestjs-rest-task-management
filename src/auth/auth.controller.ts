import {Body, Controller, Post} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {AuthService} from './auth.service';
import {RegisterDto} from './dto/register.dto';
import {User} from '../user/user.entity';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  public login(@Body() dto: LoginDto): Promise<{token: string}> {
    return this.authService.login(dto);
  }

  @Post('register')
  public register(@Body() dto: RegisterDto): Promise<User> {
    return this.authService.register(dto);
  }
}
