import {Module} from '@nestjs/common';
import {ColumnController} from './column.controller';
import {ColumnService} from './column.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ColumnRepository} from './column.repository';
import {ProjectModule} from '../project/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnRepository]),
    ProjectModule
  ],
  controllers: [ColumnController],
  providers: [ColumnService]
})
export class ColumnModule {
}
