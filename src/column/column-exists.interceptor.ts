import {BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {isUUID} from 'class-validator';
import {ColumnService} from './column.service';

@Injectable()
export class ColumnExistsInterceptor implements NestInterceptor {
  constructor(private readonly columnService: ColumnService) {
  }

  public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const projectId = req.params.projectId;
    const columnId = req.params.colummnId;
    if (!isUUID(projectId)) throw new BadRequestException('projectId param should be an uuid');
    if (!isUUID(columnId)) throw new BadRequestException('columnId param should be an uuid');
    await this.columnService.getOneByIdAndProjectId(columnId, projectId);
    return next.handle();
  }
}
