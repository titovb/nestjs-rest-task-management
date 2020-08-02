import {Injectable} from '@nestjs/common';
import {ColumnRepository} from './column.repository';
import {ColumnEntity} from './column.entity';
import {ColumnDto} from './dtos/column.dto';

@Injectable()
export class ColumnService {
  constructor(private readonly columnRepository: ColumnRepository) {
  }

  public async create(userId: string, projectId: string, dto: ColumnDto): Promise<ColumnEntity> {
    const entity = new ColumnEntity({...dto, projectId});
    entity.touch(userId);
    return this.columnRepository.save(entity);
  }

  public async update(userId: string, projectId: string, id: string, dto: ColumnDto): Promise<ColumnEntity> {
    const column = await this.columnRepository.findOne({projectId, id});
    const entity = new ColumnEntity({...column, ...dto});
    entity.touch(userId);
    return this.columnRepository.save(entity);
  }

  public async delete(projectId: string, id: string): Promise<ColumnEntity> {
    const column = await this.columnRepository.findOne({projectId, id});
    await this.columnRepository.remove(column);
    return column;
  }

  public get(projectId: string): Promise<ColumnEntity[]> {
    return this.columnRepository.find({projectId});
  }
}
