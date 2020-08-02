import {IsEmail} from 'class-validator';
import {IsNotEmptyString} from '../../common/is-not-empty-string.validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmptyString()
  password: string;
}
