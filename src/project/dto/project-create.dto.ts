import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {Transform} from 'class-transformer';

export class ProjectCreateDto {
  @IsString()
  @IsNotEmpty()
  @Transform(name => name?.trim())
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(name => name?.trim())
  description: string;
}
