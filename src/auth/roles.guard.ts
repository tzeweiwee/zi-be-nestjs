import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err, user, info, context) {
    if (err || !user || !user.role || !user.role.includes('admin')) {
      throw err || new UnauthorizedException('Authentication failed');
    }
    return user;
  }
}
