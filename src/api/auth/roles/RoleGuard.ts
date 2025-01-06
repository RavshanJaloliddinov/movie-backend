import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RequestInterface } from '../user/check-auth.guard';
import { UserRoles } from 'src/common/database/Enums';
import { Roles } from 'src/api/auth/roles/RolesDecorator';

@Injectable()
export class CheckRoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean {
        const request = context.switchToHttp().getRequest<RequestInterface>();
        const roles: string[] = this.reflector.get<string[]>('roles', context.getHandler()) || [];

        // If no roles are required for the endpoint, allow access
        if (roles.length === 0) {
            return true;
        }

        // Check if the user's role is in the allowed roles
        if (roles.includes(request.role)) {
            return true;
        }

        throw new NotAcceptableException("User doesn't have permission to access this resource");
    }
}