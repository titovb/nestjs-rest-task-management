import {PrimaryGeneratedColumn} from 'typeorm/index';
import {ApiProperty} from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  protected constructor(partial: Partial<BaseEntity>) {
    Object.assign(this, partial);
  }
}
