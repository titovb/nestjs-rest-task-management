import {Injectable} from '@nestjs/common';
import {TaskRepository} from './task.repository';
import {TaskEntity} from './task.entity';
import {TaskDto} from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {
  }

  public async create(userId: string, columnId: string, dto: TaskDto): Promise<TaskEntity> {
    const entity = new TaskEntity({...dto, columnId});
    entity.touch(userId);
    return this.taskRepository.save(entity);
  }

  public async update(userId: string, columnId: string, id: string, dto: TaskDto): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({columnId, id});
    const entity = new TaskEntity({...task, ...dto});
    entity.touch(userId);
    return this.taskRepository.save(entity);
  }

  public async delete(columnId: string, id: string): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({columnId, id});
    await this.taskRepository.remove(task);
    return task;
  }

  public async get(columnId: string): Promise<TaskEntity[]> {
    return this.taskRepository.find({columnId});
  }

  public async assign(userId: string, columnId: string, id: string, assigneeId: string): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({columnId, id});
    const entity = new TaskEntity({...task, assigneeId});
    entity.touch(userId);
    return this.taskRepository.save(entity);
  }

  public async unassign(userId: string, columnId: string, id: string): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({columnId, id});
    const entity = new TaskEntity({...task, assigneeId: null});
    entity.touch(userId);
    return this.taskRepository.save(entity);
  }

  public async move(userId: string, columnId: string, id: string, newColumnId: string): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({columnId, id});
    const entity = new TaskEntity({...task, columnId: newColumnId});
    entity.touch(userId);
    return this.taskRepository.save(entity);
  }
}
