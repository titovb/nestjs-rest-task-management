import {ArgumentMetadata, BadRequestException, PipeTransform} from '@nestjs/common';
import {isUUID} from 'class-validator';

export class IsUUIDPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!isUUID(value)) throw new BadRequestException(`'${metadata.data}' ${metadata.type} should be an uuid`);
    return value;
  }
}
