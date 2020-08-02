import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete, Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {ColumnService} from './column.service';
import {ColumnEntity} from './column.entity';
import {CurrentUser} from '../auth/current-user.decorator';
import {UserEntity} from '../user/user.entity';
import {ColumnDto} from './dtos/column.dto';
import {AuthGuard} from '@nestjs/passport';
import {ProjectParticipantGuard} from '../project/project-participant.guard';
import {IsUUIDPipe} from '../common/is-uuid.pipe';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('project/:projectId/column')
@UseGuards(AuthGuard('jwt'), ProjectParticipantGuard)
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {
  }

  @Post()
  public create(@CurrentUser() user: UserEntity,
                @Param('projectId') projectId: string,
                @Body() dto: ColumnDto): Promise<ColumnEntity> {
    return this.columnService.create(user.id, projectId, dto);
  }

  @Put(':id')
  public update(@CurrentUser() user: UserEntity,
                @Param('projectId') projectId: string,
                @Param('id', IsUUIDPipe) id: string,
                @Body() dto: ColumnDto): Promise<ColumnEntity> {
    return this.columnService.update(user.id, projectId, id, dto);
  }

  @Delete(':id')
  public delete(@Param('projectId') projectId: string,
                @Param('id', IsUUIDPipe) id: string): Promise<ColumnEntity> {
    return this.columnService.delete(projectId, id);
  }

  @Get()
  public get(@Param('projectId') projectId: string): Promise<ColumnEntity[]> {
    return this.columnService.get(projectId);
  }
}
