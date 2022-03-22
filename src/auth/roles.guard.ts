import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()  // этот декоратор показывает, что этот класс может быть внедрён в контроллер (или ещё куда-нибудь)
export class RolesGuard implements CanActivate {  // встроенный класс nestjs

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {
  }

  // когда метод canActivate возвращает true, тогда доступ к эндпойнту разрешён, когда false - запрещён
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),  // это чтобы рефлектор понимал
        context.getClass()     // какие данные ему нужно доставать
      ])
      if (!requiredRoles) { // если у нас этих ролей нет
        return true         // то функция, которую мы гвардим, будет доступна всем пользователям
      }
      const req = context.switchToHttp().getRequest()      // получаем объект реквеста из контекста
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: 'User is not authorized' });
      }

      const user = this.jwtService.verify(token);  // если токен не корректный нас перекинет в catch
      req.user = user;  // добавляем к запросу объект, с информацией о пользователе

      /* обращаемся к ролям, которые лежат внутри токена и проверяем есть ли у пользователя такая роль,
         которая необходима для этого ендпойнта */
      return user.roles.some(role => requiredRoles.includes(role.value));
    } catch (e) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN);
    }
  }
}
