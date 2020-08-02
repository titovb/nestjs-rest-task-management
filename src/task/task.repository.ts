import {EntityRepository, Repository} from 'typeorm/index';
import {TaskEntity} from './task.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
}
