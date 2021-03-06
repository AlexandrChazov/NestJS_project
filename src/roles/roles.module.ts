import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from '../users/users.model';
import { UserRoles } from './user-roles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles])  // добавляем модели, которые мы используем в этом модуле
  ],
  exports: [
    RolesService   // сервис будет импортироваться вместе со всем модулем внутрь users.service.ts
  ]
})
export class RolesModule {}
