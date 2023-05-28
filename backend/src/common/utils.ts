import {
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

export function orThrowUnauthorized(fnresult: any): any {
  if (fnresult) {
    return fnresult;
  }

  throw new UnauthorizedException();
}

export function orThrowNotFound(fnresult: any): any {
  if (fnresult) {
    return fnresult;
  }

  throw new NotFoundException();
}

export function orThrowBadRequest(fnresult: any): any {
  if (fnresult) {
    return fnresult;
  }

  throw new BadRequestException();
}
