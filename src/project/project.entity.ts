import {Column, Entity, JoinTable, ManyToMany, ManyToOne} from 'typeorm/index';
import {UserEntity} from '../user/user.entity';
import {Exclude} from 'class-transformer';
import {TouchableEntity} from '../common/touchable-entity';

@Entity()
export class ProjectEntity extends TouchableEntity {
  @Column()
  name: string;

  @Column({nullable: true})
  description: string;

  @Exclude()
  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;

  @Exclude()
  @ManyToOne(() => UserEntity)
  updatedBy: UserEntity;

  @Exclude()
  @ManyToMany(() => UserEntity)
  @JoinTable()
  participants: UserEntity[];

  constructor(partial: Partial<ProjectEntity>) {
    super(partial);
  }
}
