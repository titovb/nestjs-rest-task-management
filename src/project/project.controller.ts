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
import {ProjectService} from './project.service';
import {ProjectEntity} from './project.entity';
import {AuthGuard} from '@nestjs/passport';
import {ProjectDto} from './dto/project.dto';
import {CurrentUser} from '../auth/current-user.decorator';
import {UserEntity} from '../user/user.entity';
import {IsUUIDPipe} from '../common/is-uuid.pipe';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {

  constructor(private readonly projectService: ProjectService) {
  }

  @Post()
  public create(@CurrentUser() user: UserEntity, @Body() dto: ProjectDto): Promise<ProjectEntity> {
    return this.projectService.create(user, dto);
  }

  @Put(':id')
  public update(@CurrentUser() user: UserEntity,
                @Param('id', IsUUIDPipe) id: string,
                @Body() dto: ProjectDto): Promise<ProjectEntity> {
    return this.projectService.update(user.id, id, dto);
  }

  @Delete(':id')
  public delete(@CurrentUser() user: UserEntity,
                @Param('id', IsUUIDPipe) id: string): Promise<ProjectEntity> {
    return this.projectService.delete(user.id, id);
  }

  @Get(':id')
  public getOneById(@CurrentUser() user: UserEntity,
                    @Param('id', IsUUIDPipe) id: string): Promise<ProjectEntity> {
    return this.projectService.getOneById(user.id, id);
  }

  @Get()
  public get(@CurrentUser() user: UserEntity): Promise<ProjectEntity[]> {
    return this.projectService.get(user.id);
  }

  @Post(':id/participant/:participantId')
  public addParticipant(@CurrentUser() user: UserEntity,
                        @Param('id', IsUUIDPipe) id: string,
                        @Param('participantId', IsUUIDPipe) participantId: string): Promise<UserEntity[]> {
    return this.projectService.addParticipant(user.id, id, participantId);
  }

  @Delete(':id/participant/:participantId')
  public removeParticipant(@CurrentUser() user: UserEntity,
                           @Param('id', IsUUIDPipe) id: string,
                           @Param('participantId', IsUUIDPipe) participantId: string): Promise<UserEntity[]> {
    return this.projectService.removeParticipant(user.id, id, participantId);
  }

  @Get(':id/participant')
  public getParticipants(@CurrentUser() user: UserEntity,
                         @Param('id', IsUUIDPipe) id: string): Promise<UserEntity[]> {
    return this.projectService.getParticipants(user.id, id);
  }
}
