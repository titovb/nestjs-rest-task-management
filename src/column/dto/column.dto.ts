import {IsNotEmptyString} from '../../common/is-not-empty-string.validator';
import {ApiProperty} from '@nestjs/swagger';

export class ColumnDto {
  @ApiProperty()
  @IsNotEmptyString()
  name: string;
}
