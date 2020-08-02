import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {ProjectRepository} from './project.repository';
import {ProjectEntity} from './project.entity';
import {ProjectDto} from './dto/project.dto';
import {UserEntity} from '../user/user.entity';
import {UserService} from '../user/user.service';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository,
              private readonly userService: UserService) {
  }

  public async create(user: UserEntity, dto: ProjectDto): Promise<ProjectEntity> {
    const entity = new ProjectEntity({...dto, participants: [user]});
    entity.touch(user.id);
    return this.projectRepository.save(entity);
  }

  public async update(userId: string, id: string, dto: ProjectDto): Promise<ProjectEntity> {
    const project = await this.getOneByIdForParticipantOrFail(id, userId);
    const entity = new ProjectEntity({...project, ...dto});
    entity.touch(userId);
    return this.projectRepository.save(entity);
  }

  public async delete(userId: string, id: string): Promise<ProjectEntity> {
    const project = await this.getOneByIdForOwnerOrFail(id, userId);
    await this.projectRepository.remove(project);
    return project;
  }

  public async get(userId: string): Promise<ProjectEntity[]> {
    return this.projectRepository.findByParticipant(userId);
  }

  public async getOneById(userId: string, id: string): Promise<ProjectEntity> {
    return this.getOneByIdForParticipantOrFail(id, userId);
  }

  public async addParticipant(userId: string, id: string, participantId: string): Promise<UserEntity[]> {
    const project = await this.getOneByIdForOwnerOrFail(id, userId);
    const participant = await this.userService.getOneById(participantId);
    if (project.participants.some(participant => participant.id === participantId)) return project.participants;
    project.participants.push(participant);
    project.touch(userId);
    await this.projectRepository.save(project);
    return project.participants;
  }

  public async removeParticipant(userId: string, id: string, participantId: string): Promise<UserEntity[]> {
    const project = await this.getOneByIdForOwnerOrFail(id, userId);
    if (project.createdById === participantId) throw new BadRequestException(`Owner can't be removed from project`);
    project.participants = project.participants.filter(participant => participant.id !== participantId);
    project.touch(userId);
    await this.projectRepository.save(project);
    return project.participants;
  }

  public async getParticipants(userId: string, id: string): Promise<UserEntity[]> {
    await this.getOneByIdForParticipantOrFail(id, userId);
    const project = await this.projectRepository.findOne({id}, {relations: ['participants']});
    return project.participants;
  }

  public async getOneByIdForParticipantOrFail(id: string, userId: string): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOneByIdAndParticipant(id, userId);
    if (!project) throw new NotFoundException(`Project '${id}' not found`);
    return project;
  }

  private async getOneByIdForOwnerOrFail(id: string, userId: string): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOne({id, createdById: userId}, {relations: ['participants']});
    if (!project) throw new NotFoundException(`Project '${id}' not found`);
    return project;
  }
}
