import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const superAdminKey = req.headers['super-admin-key'];

      if (!superAdminKey || process.env.SUPER_ADMIN_KEY !== superAdminKey) {
        throw new HttpException(
          'Forbidden. This path only for Super Admin',
          HttpStatus.FORBIDDEN,
        );
      }

      return true;
    } catch (e) {
      throw new HttpException(
        'Forbidden. This path only for Super Admin',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
