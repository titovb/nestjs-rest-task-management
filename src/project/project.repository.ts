import {ProjectEntity} from './project.entity';
import {EntityRepository, Repository} from 'typeorm/index';

@EntityRepository(ProjectEntity)
export class ProjectRepository extends Repository<ProjectEntity> {
  public findByParticipant(participantId: string): Promise<ProjectEntity[]> {
    return this.createQueryBuilder('project')
      .leftJoin('project.participants', 'participants')
      .where('participants.id IN (:participantId)', {participantId})
      .getMany();
  }

  public findOneByIdAndParticipant(id: string, participantId: string): Promise<ProjectEntity> {
    return this.createQueryBuilder('project')
      .leftJoin('project.participants', 'participants')
      .where('project.id = :id', {id})
      .andWhere('participants.id IN (:participantId)', {participantId})
      .getOne();
  }
}
