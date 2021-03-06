import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../posts/posts.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post]), // добавляем модели, которые мы используем в этом модуле
    RolesModule,   // модуль импортируется вместе с сервисом
    forwardRef(() => AuthModule)   // forwardRef чтобы предотвратить циклическую зависимость, ведь Auth импортирует
  ],                                   // User, а User импортирует Auth
  exports: [
    UsersService
  ]
})
export class UsersModule {}
