import {Column, Entity, ManyToOne} from 'typeorm/index';
import {ProjectEntity} from '../project/project.entity';
import {Exclude} from 'class-transformer';
import {UserEntity} from '../user/user.entity';
import {TouchableEntity} from '../common/touchable-entity';

@Entity()
export class ColumnEntity extends TouchableEntity {
  @Column()
  name: string;

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
