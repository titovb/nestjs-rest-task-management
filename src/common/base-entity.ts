import {PrimaryGeneratedColumn} from 'typeorm/index';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  protected constructor(partial: Partial<BaseEntity>) {
    Object.assign(this, partial);
  }
}
