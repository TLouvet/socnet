import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (this.isPublicRoute(request.url) || this.getAuthorizationToken(request)) {
      return true;
    }

    throw new UnauthorizedException();
  }

  private getAuthorizationToken(request) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return false;
    }

    return true;
  }

  private isPublicRoute(requestUrl: string) {
    const PUBLIC_ROUTES = ['/api/auth'];
    return PUBLIC_ROUTES.some((route) => requestUrl.startsWith(route));
  }
}
