import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm/index';
import {Project} from '../project/project.entity';
import {Exclude} from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Project, project => project.owner)
  ownedProjects: Project[];

  @ManyToMany(() => Project, project => project.participants)
  projects: Project[];
}
