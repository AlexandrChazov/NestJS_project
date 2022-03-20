import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],  // регистрируем контроллер в модули
  providers: [],       // любой переиспользуемый компонент, всё что содержит логику и может использоваться в других компонентах
                                   // чтобы сервис работал нам нужно сделать его инъекцию в контроллер
  imports: [                       // чтобы импортировать другие модули
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),  // порт по умолчанию для postgres
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,        // название БД
      models: [User, Role, UserRoles],          // регистрируем все модели, которые мы описывали
      autoLoadModels: true                      // чтобы Sequelize создавал таблицы в БД на основании тех моделей, которые мы будем создавать
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ]
})

export class AppModule {}
