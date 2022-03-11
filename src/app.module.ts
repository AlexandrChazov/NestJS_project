import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],  // регистрируем контроллер в модули
  providers: [AppService]  // любой переиспользуемый компонент, всё что содержит логику и может использоваться в других компонентах
                           // чтобы сервис работал нам нужно сделать его инъекцию в контроллер
})

export class AppModule {}
