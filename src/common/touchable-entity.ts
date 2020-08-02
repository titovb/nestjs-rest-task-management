import {BaseEntity} from './base-entity';
import {Column, CreateDateColumn, UpdateDateColumn} from 'typeorm/index';

export abstract class TouchableEntity extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  createdById: string;

  @Column()
  updatedById: string;

  public touch(userId: string): void {
    if (!this.createdAt) {
      this.createdById = userId;
    }
    this.updatedById = userId;
  }
}
