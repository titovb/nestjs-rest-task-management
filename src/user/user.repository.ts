import {EntityRepository, Repository} from 'typeorm/index';
import {User} from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
}
