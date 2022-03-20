import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()  // этот декоратор показывает, что этот класс может быть внедрён в контроллер (или ещё куда-нибудь)
export class JwtAuthGuard implements CanActivate {  // встроенный класс nestjs

  constructor(private jwtService: JwtService) {
  }

  // когда метод canActivate возвращает true, тогда доступ к эндпойнту разрешён, когда false - запрещён
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest()      // получаем объект реквеста из контекста
      try {
        const authHeader = req.headers.authorization;
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];

        if (bearer !== "Bearer" || !token) {
          throw new UnauthorizedException({ message: 'User is not authorized' });
        }

        const user = this.jwtService.verify(token);  // если токен не корректный нас перекинет в catch
        req.user = user;  // добавляем к запросу объект, с информацией о пользователе
        return true;

      } catch (e) {
        throw new UnauthorizedException({ message: 'User is not authorized' });
      }
    }
}
