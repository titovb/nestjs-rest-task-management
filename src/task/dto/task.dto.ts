import {IsNotEmptyString} from '../../common/is-not-empty-string.validator';
import {IsOptional} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty()
  @IsNotEmptyString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmptyString()
  description: string;
}
