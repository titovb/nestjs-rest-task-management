import {Column, Entity, JoinTable, ManyToMany, ManyToOne} from 'typeorm/index';
import {UserEntity} from '../user/user.entity';
import {Exclude} from 'class-transformer';
import {TouchableEntity} from '../common/touchable-entity';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

@Entity('project')
export class ProjectEntity extends TouchableEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiPropertyOptional()
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
