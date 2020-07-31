import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {ProjectRepository} from './project.repository';
import {Project} from './project.entity';
import {ProjectCreateDto} from './dto/project-create.dto';
import {User} from '../user/user.entity';
import {UserRepository} from '../user/user.repository';
import {ProjectUpdateDto} from './dto/project-update.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository,
              private readonly userRepository: UserRepository) {
  }

  public async create(user: User, dto: ProjectCreateDto): Promise<Project> {
    return this.projectRepository.save({
      ...dto,
      ownerId: user.id,
      participants: [user]
    });
  }

  public async update(userId: string, id: string, dto: ProjectUpdateDto): Promise<Project> {
    const project = await this.getOneByIdForParticipantOrFail(id, userId);
    return this.projectRepository.save({
      ...project,
      updatedById: userId,
      name: dto.name,
      description: dto.description
    });
  }

  public async delete(userId: string, id: string): Promise<Project> {
    const project = await this.getOneByIdForOwnerOrFail(id, userId);
    await this.projectRepository.remove(project);
    return project;
  }

  public async get(userId: string): Promise<Project[]> {
    return this.projectRepository.findByParticipant(userId);
  }

  public async getOneById(userId: string, id: string): Promise<Project> {
    return this.getOneByIdForParticipantOrFail(id, userId);
  }

  public async addParticipant(userId: string, id: string, participantId: string): Promise<User[]> {
    const project = await this.getOneByIdForOwnerOrFail(id, userId);
    const participant = await this.userRepository.findOne(participantId);
    if (!participant) throw new NotFoundException(`User '${participantId}' not found`);
    if (project.participants.some(participant => participant.id === participantId)) return project.participants;
    project.participants.push(participant);
    await this.projectRepository.save({...project, updatedById: userId});
    return project.participants;
  }

  public async removeParticipant(userId: string, id: string, participantId: string): Promise<User[]> {
    const project = await this.getOneByIdForOwnerOrFail(id, userId);
    if (project.ownerId === participantId) throw new BadRequestException(`Owner can't be removed from project`);
    project.participants = project.participants.filter(participant => participant.id !== participantId);
    await this.projectRepository.save({...project, updatedById: userId});
    return project.participants;
  }

  public async getParticipants(userId: string, id: string): Promise<User[]> {
    await this.getOneByIdForParticipantOrFail(id, userId);
    const project = await this.projectRepository.findOne({id}, {relations: ['participants']});
    return project.participants;
  }

  private async getOneByIdForOwnerOrFail(id: string, ownerId: string): Promise<Project> {
    const project = await this.projectRepository.findOne({id, ownerId}, {relations: ['participants']});
    if (!project) throw new NotFoundException(`Project '${id}' not found`);
    return project;
  }

  private async getOneByIdForParticipantOrFail(id: string, userId: string): Promise<Project> {
    const project = await this.projectRepository.findOneByIdAndParticipant(id, userId);
    if (!project) throw new NotFoundException(`Project '${id}' not found`);
    return project;
  }
}
