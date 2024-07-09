/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor(private zodType: ZodType) {}
    transform(value: any, metadata: ArgumentMetadata) {
        // ! Bisa lakukan pengecekan
        if (metadata.type == 'body') {
            return this.zodType.parse(value);
        } else {
            return value;
        }
    }
}
