import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {TaskService} from './task.service';
import {TaskEntity} from './task.entity';
import {CurrentUser} from '../auth/current-user.decorator';
import {UserEntity} from '../user/user.entity';
import {TaskDto} from './dto/task.dto';
import {ProjectParticipantInterceptor} from '../project/project-participant.interceptor';
import {ColumnExistsInterceptor} from '../column/column-exists.interceptor';
import {IsUUIDPipe} from '../common/is-uuid.pipe';
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Task')
@ApiBearerAuth()
@Controller('project/:projectId/column/:columnId/task')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor, ProjectParticipantInterceptor, ColumnExistsInterceptor)
export class TaskController {
  constructor(private readonly taskService: TaskService) {
  }

  @ApiCreatedResponse({type: TaskEntity})
  @Post()
  public create(@CurrentUser() user: UserEntity,
                @Param('columnId') columnId: string,
                @Body() dto: TaskDto): Promise<TaskEntity> {
    return this.taskService.create(user.id, columnId, dto);
  }

  @ApiOkResponse({type: TaskEntity})
  @Put(':id')
  public update(@CurrentUser() user: UserEntity,
                @Param('columnId') columnId: string,
                @Param('id', IsUUIDPipe) id: string,
                @Body() dto: TaskDto): Promise<TaskEntity> {
    return this.taskService.update(user.id, columnId, id, dto);
  }

  @ApiOkResponse({type: TaskEntity})
  @Delete(':id')
  public delete(@Param('columnId') columnId: string,
                @Param('id') id: string): Promise<TaskEntity> {
    return this.taskService.delete(columnId, id);
  }

  @ApiOkResponse({type: TaskEntity})
  @Put(':id/assign/:assigneeId')
  public assign(@CurrentUser() user: UserEntity,
                @Param('columnId') columnId: string,
                @Param('id') id: string,
                @Param('assigneeId') assigneeId: string): Promise<TaskEntity> {
    return this.taskService.assign(user.id, columnId, id, assigneeId);
  }

  @ApiOkResponse({type: TaskEntity})
  @Put(':id/unassign')
  public unassign(@CurrentUser() user: UserEntity,
                  @Param('columnId') columnId: string,
                  @Param('id') id: string): Promise<TaskEntity> {
    return this.taskService.unassign(user.id, columnId, id);
  }

  @ApiOkResponse({type: TaskEntity})
  @Put(':id/move/:newColumnId')
  public move(@CurrentUser() user: UserEntity,
              @Param('columnId') columnId: string,
              @Param('id') id: string,
              @Param('newColumnId') newColumnId: string): Promise<TaskEntity> {
    return this.taskService.move(user.id, columnId, id, newColumnId);
  }
}
