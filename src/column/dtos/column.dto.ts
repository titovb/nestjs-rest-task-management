import {IsNotEmptyString} from '../../common/is-not-empty-string.validator';

export class ColumnDto {
  @IsNotEmptyString()
  name: string;
}
