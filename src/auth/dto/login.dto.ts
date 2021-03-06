import {IsEmail} from 'class-validator';
import {IsNotEmptyString} from '../../common/is-not-empty-string.validator';
import {ApiProperty} from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmptyString()
  password: string;
}
