import {IsOptional} from 'class-validator';
import {IsNotEmptyString} from '../../common/is-not-empty-string.validator';

export class ProjectDto {
  @IsNotEmptyString()
  name: string;

  @IsOptional()
  @IsNotEmptyString()
  description: string;
}
