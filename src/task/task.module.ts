import {Module} from '@nestjs/common';
import {TaskService} from './task.service';
import {TaskController} from './task.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TaskRepository} from './task.repository';
import {ProjectModule} from '../project/project.module';
import {ColumnModule} from '../column/column.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    ProjectModule,
    ColumnModule
  ],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {
}
