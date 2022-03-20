import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })  // описываем статус ответа и данные, которые он вернёт
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })  // описываем статус ответа и данные, которые он вернёт

  @UseGuards(JwtAuthGuard)  // используем JwtAuthGuard чтобы ограничить неавторизованным пользователям
  @Get()                    // доступ к получению списка всех пользователей
  getAll() {
    return this.userService.getAllUsers()
  }
}
