import {BadRequestException, CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {ProjectService} from './project.service';
import {isUUID} from 'class-validator';

@Injectable()
export class ProjectParticipantGuard implements CanActivate {
  constructor(private readonly projectService: ProjectService) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const projectId = req.params.projectId;
    if (!isUUID(projectId)) throw new BadRequestException('projectId param should be an uuid');
    await this.projectService.getOneByIdForParticipantOrFail(projectId, userId);
    return true;
  }
}
