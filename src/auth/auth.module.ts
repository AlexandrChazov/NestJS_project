import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule), // forwardRef чтобы предотвратить циклическую зависимость, ведь Auth импортирует
    JwtModule.register({        // User, а User импортирует Auth
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: { expiresIn: '24h' }
    })
  ],
  exports: [
    AuthService,  // чтобы AuthService можно было переиспользовать
    JwtModule
  ]
})
export class AuthModule {}
