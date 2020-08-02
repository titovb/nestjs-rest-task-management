import {TouchableEntity} from '../common/touchable-entity';
import {Column, Entity, ManyToOne} from 'typeorm/index';
import {Exclude} from 'class-transformer';
import {UserEntity} from '../user/user.entity';
import {ColumnEntity} from '../column/column.entity';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

@Entity('task')
export class TaskEntity extends TouchableEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiPropertyOptional()
  @Column({nullable: true})
  description: string;

  @ApiPropertyOptional()
  @Column({nullable: true})
  assigneeId: string;

  @Exclude()
  @ManyToOne(() => UserEntity)
  assignee: UserEntity;

  @ApiProperty()
  @Column()
  columnId: string;

  @Exclude()
  @ManyToOne(() => ColumnEntity)
  column: ColumnEntity;

  @Exclude()
  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;

  @Exclude()
  @ManyToOne(() => UserEntity)
  updatedBy: UserEntity;

  constructor(partial: Partial<TaskEntity>) {
    super(partial);
  }
}
