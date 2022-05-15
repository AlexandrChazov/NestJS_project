import { Module } from '@nestjs/common';
import { FilesService } from './files.service';

@Module({
  providers: [FilesService],
  exports: [FilesService]  // чтобы можно было использовать этот сервис в пост сервисе
})
export class FilesModule {}

// здесь мы не используем контроллер, поскольку этот модуль используется внутри других
// контроллеров, сервисов, т.е. там где он понадобится
