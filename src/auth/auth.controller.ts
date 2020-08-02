import {Body, ClassSerializerInterceptor, Controller, HttpCode, Post, UseInterceptors} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {AuthService} from './auth.service';
import {RegisterDto} from './dto/register.dto';
import {UserEntity} from '../user/user.entity';
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {LoginResDto} from './dto/login-res.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOkResponse({type: LoginResDto})
  @Post('login')
  @HttpCode(200)
  public login(@Body() dto: LoginDto): Promise<LoginResDto> {
    return this.authService.login(dto);
  }

  @ApiCreatedResponse({type: UserEntity})
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  public register(@Body() dto: RegisterDto): Promise<UserEntity> {
    return this.authService.register(dto);
  }
}
