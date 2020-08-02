import {Column, Entity} from 'typeorm/index';
import {Exclude} from 'class-transformer';
import {BaseEntity} from '../common/base-entity';
import {ApiProperty} from '@nestjs/swagger';

@Entity('user')
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    super(partial);
  }
}
