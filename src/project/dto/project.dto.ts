import {IsOptional} from 'class-validator';
import {IsNotEmptyString} from '../../common/is-not-empty-string.validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class ProjectDto {
  @ApiProperty()
  @IsNotEmptyString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmptyString()
  description: string;
}
