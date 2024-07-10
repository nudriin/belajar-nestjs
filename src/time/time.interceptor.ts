import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            // response body nya aakan di tambah timestamp yaitu waktu server meresponnya
            map((value) => {
                value.timestamp = new Date();
                return value;
            }),
        );
    }
}
