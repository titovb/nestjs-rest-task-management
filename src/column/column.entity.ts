import {Column, Entity, ManyToOne} from 'typeorm/index';
import {ProjectEntity} from '../project/project.entity';
import {Exclude} from 'class-transformer';
import {UserEntity} from '../user/user.entity';
import {TouchableEntity} from '../common/touchable-entity';
import {ApiProperty} from '@nestjs/swagger';

@Entity('column')
export class ColumnEntity extends TouchableEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  projectId: string;

  @Exclude()
  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;

  @Exclude()
  @ManyToOne(() => UserEntity)
  updatedBy: UserEntity;

  @Exclude()
  @ManyToOne(() => ProjectEntity, {cascade: ['remove'], onDelete: 'CASCADE'})
  project: ProjectEntity;

  constructor(partial: Partial<ColumnEntity>) {
    super(partial);
  }
}
