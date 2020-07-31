import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/index';
import {User} from '../user/user.entity';
import {Exclude} from 'class-transformer';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable: true})
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({nullable: true})
  ownerId: string;

  @Exclude()
  @ManyToOne(() => User, user => user.id)
  owner: User;

  @Column({nullable: true})
  updatedById: string;

  @Exclude()
  @ManyToOne(() => User)
  updatedBy: User;

  @Exclude()
  @ManyToMany(() => User, user => user.id)
  @JoinTable()
  participants: User[];
}
