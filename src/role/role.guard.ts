import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {} // menbambahkan field roles
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // Mengambil reflector Roles menggunakan context.getHandler()
        const roles: string[] = this.reflector.get(Roles, context.getHandler());
        if (!roles) {
            return true;
        }
        const user = context.switchToHttp().getRequest().user;
        // cek di field roles apakah ada index dari request user.role
        return roles.indexOf(user.role) != -1;
    }
}
