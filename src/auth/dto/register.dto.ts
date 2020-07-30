import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {Transform} from 'class-transformer';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Transform(val => val?.trim())
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform(val => val?.trim())
  password: string;
}
