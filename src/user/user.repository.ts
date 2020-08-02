import {EntityRepository, Repository} from 'typeorm/index';
import {UserEntity} from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
}
