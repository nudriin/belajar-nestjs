import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
// Genericnya kiat buat dari express response dan express request
export class LogMiddleware implements NestMiddleware<Request, Response> {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}
    use(req: Request, res: Response, next: () => void) {
        this.logger.info(
            `${req.method} request from URL: ${req.url} and IP: ${req.ip}`,
        );
        next();
    }
}
