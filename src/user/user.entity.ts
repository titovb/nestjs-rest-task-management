import {Column, Entity} from 'typeorm/index';
import {Exclude} from 'class-transformer';
import {BaseEntity} from '../common/base-entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    super(partial);
  }
}
