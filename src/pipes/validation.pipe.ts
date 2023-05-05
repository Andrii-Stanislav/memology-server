import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { ValidationExeptions } from '../exceptions/validation.exceptions';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.reduce(
        (acc, err) => ({
          ...acc,
          [err.property]: Object.values(err.constraints),
        }),
        {},
      );

      throw new ValidationExeptions(messages);
    }
    return value;
  }
}
