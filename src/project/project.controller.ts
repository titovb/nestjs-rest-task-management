import {
  BadRequestException,
  Body, ClassSerializerInterceptor,
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
import {Project} from './project.entity';
import {AuthGuard} from '@nestjs/passport';
import {ProjectCreateDto} from './dto/project-create.dto';
import {CurrentUser} from '../auth/current-user.decorator';
import {User} from '../user/user.entity';
import {ProjectUpdateDto} from './dto/project-update.dto';
import {isUUID} from 'class-validator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('project')
export class ProjectController {

  constructor(private readonly projectService: ProjectService) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public create(@CurrentUser() user: User, @Body() dto: ProjectCreateDto): Promise<Project> {
    return this.projectService.create(user, dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  public update(@CurrentUser() user: User,
                @Param('id') id: string,
                @Body() dto: ProjectUpdateDto): Promise<Project> {
    if (!isUUID(id)) throw new BadRequestException('Incorrect id');
    return this.projectService.update(user.id, id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  public delete(@CurrentUser() user: User, @Param('id') id: string): Promise<Project> {
    if (!isUUID(id)) throw new BadRequestException('Incorrect id');
    return this.projectService.delete(user.id, id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  public getOneById(@CurrentUser() user: User, @Param('id') id: string): Promise<Project> {
    if (!isUUID(id)) throw new BadRequestException('Incorrect id');
    return this.projectService.getOneById(user.id, id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public get(@CurrentUser() user: User): Promise<Project[]> {
    return this.projectService.get(user.id);
  }

  @Post(':id/participant/:participantId')
  @UseGuards(AuthGuard('jwt'))
  public addParticipant(@CurrentUser() user: User,
                        @Param('id') id: string,
                        @Param('participantId') participantId: string): Promise<User[]> {
    if (!isUUID(id)) throw new BadRequestException('Incorrect id');
    if (!isUUID(participantId)) throw new BadRequestException('Incorrect participantId');
    return this.projectService.addParticipant(user.id, id, participantId);
  }

  @Delete(':id/participant/:participantId')
  @UseGuards(AuthGuard('jwt'))
  public removeParticipant(@CurrentUser() user: User,
                           @Param('id') id: string,
                           @Param('participantId') participantId: string): Promise<User[]> {
    if (!isUUID(id)) throw new BadRequestException('Incorrect id');
    if (!isUUID(participantId)) throw new BadRequestException('Incorrect participantId');
    return this.projectService.removeParticipant(user.id, id, participantId);
  }

  @Get(':id/participant')
  @UseGuards(AuthGuard('jwt'))
  public getParticipants(@CurrentUser() user: User,
                         @Param('id') id: string): Promise<User[]> {
    if (!isUUID(id)) throw new BadRequestException('Incorrect id');
    return this.projectService.getParticipants(user.id, id);
  }
}
