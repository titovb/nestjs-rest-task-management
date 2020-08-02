import {Injectable, NotFoundException} from '@nestjs/common';
import {UserRepository} from './user.repository';
import {UserEntity} from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  public async getOneById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException(`User '${id}' not found`);
    return user;
  }

  public getOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({email});
  }

  public create(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }
}
