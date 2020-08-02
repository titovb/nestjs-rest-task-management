import {IsEmail} from 'class-validator';
import {IsNotEmptyString} from '../../common/is-not-empty-string.validator';

export class RegisterDto {
  @IsNotEmptyString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmptyString()
  password: string;
}
