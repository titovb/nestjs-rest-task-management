import {BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {ProjectService} from './project.service';
import {isUUID} from 'class-validator';
import {Observable} from 'rxjs';

@Injectable()
export class ProjectParticipantInterceptor implements NestInterceptor {
  constructor(private readonly projectService: ProjectService) {
  }

  public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const projectId = req.params.projectId;
    if (!isUUID(projectId)) throw new BadRequestException('projectId param should be an uuid');
    await this.projectService.getOneByIdForParticipantOrFail(projectId, userId);
    return next.handle();
  }
}
