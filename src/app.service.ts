import { Injectable } from '@nestjs/common';

@Injectable()  // чтобы класс стал провайдером, т.е. этот сервис мы будем внедрять в контроллер, т.е. делать инъекцию
export class AppService {
  getUsers() {
    return [{id: 1, name: 'Ulbi TV'}]
  }
}
