import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private roles: string[]) {} // menbambahkan field roles
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const user = context.switchToHttp().getRequest().user;
        // cek di field roles apakah ada index dari request user.role
        return this.roles.indexOf(user.role) != -1;
    }
}
