import {BaseEntity} from './base-entity';
import {Column, CreateDateColumn, UpdateDateColumn} from 'typeorm/index';
import {ApiProperty} from '@nestjs/swagger';

export abstract class TouchableEntity extends BaseEntity {
  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @Column()
  createdById: string;

  @ApiProperty()
  @Column()
  updatedById: string;

  public touch(userId: string): void {
    if (!this.createdAt) {
      this.createdById = userId;
    }
    this.updatedById = userId;
  }
}
