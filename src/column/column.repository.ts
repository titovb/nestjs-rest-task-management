import {EntityRepository, Repository} from 'typeorm/index';
import {ColumnEntity} from './column.entity';

@EntityRepository(ColumnEntity)
export class ColumnRepository extends Repository<ColumnEntity> {
}
