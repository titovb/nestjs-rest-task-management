import {Project} from './project.entity';
import {EntityRepository, Repository} from 'typeorm/index';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  public findByParticipant(participantId: string): Promise<Project[]> {
    return this.createQueryBuilder('project')
      .leftJoin('project.participants', 'participants')
      .where('participants.id IN (:participantId)', {participantId})
      .getMany();
  }

  public findOneByIdAndParticipant(id: string, participantId: string): Promise<Project> {
    return this.createQueryBuilder('project')
      .leftJoin('project.participants', 'participants')
      .where('project.id = :id', {id})
      .andWhere('participants.id IN (:participantId)', {participantId})
      .getOne();
  }
}
