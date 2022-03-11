import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')    // декоратор принимает аргументом префикс, по которому будет отрабатывать контроллер
export class AppController {

  constructor(private appService: AppService) {}  // делаем инъекцию сервиса в контроллер

  @Get('/users')                     // этот декоратор чтобы ф-ция стала эндпойнтом и мы могли отправлять http запросы
  getUsers() {
    return this.appService.getUsers()  // мы не создаём объект этого класса, это делает Nest, мы просто пользуемся
  }
}
