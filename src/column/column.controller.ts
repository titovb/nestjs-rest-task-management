import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
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
import {ColumnDto} from './dto/column.dto';
import {AuthGuard} from '@nestjs/passport';
import {IsUUIDPipe} from '../common/is-uuid.pipe';
import {ProjectParticipantInterceptor} from '../project/project-participant.interceptor';
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Column')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor, ProjectParticipantInterceptor)
@UseGuards(AuthGuard('jwt'))
@Controller('project/:projectId/column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {
  }

  @ApiCreatedResponse({type: ColumnEntity})
  @Post()
  public create(@CurrentUser() user: UserEntity,
                @Param('projectId') projectId: string,
                @Body() dto: ColumnDto): Promise<ColumnEntity> {
    return this.columnService.create(user.id, projectId, dto);
  }

  @ApiOkResponse({type: ColumnEntity})
  @Put(':id')
  public update(@CurrentUser() user: UserEntity,
                @Param('projectId') projectId: string,
                @Param('id', IsUUIDPipe) id: string,
                @Body() dto: ColumnDto): Promise<ColumnEntity> {
    return this.columnService.update(user.id, projectId, id, dto);
  }

  @ApiOkResponse({type: ColumnEntity})
  @Delete(':id')
  public delete(@Param('projectId') projectId: string,
                @Param('id', IsUUIDPipe) id: string): Promise<ColumnEntity> {
    return this.columnService.delete(projectId, id);
  }

  @ApiOkResponse({type: ColumnEntity, isArray: true})
  @Get()
  public get(@Param('projectId') projectId: string): Promise<ColumnEntity[]> {
    return this.columnService.get(projectId);
  }
}
