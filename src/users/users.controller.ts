import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'User creation' }) // описание
  @ApiResponse({ status: 200, type: User })  // описываем статус ответа и данные, которые он вернёт
  // @UsePipes(ValidationPipe) отдельно пайп можно не указывать, так как мы указали этот пайп глобально в main.ts
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Get all users' }) // описание
  @ApiResponse({ status: 200, type: [User] })  // описываем статус ответа и данные, которые он вернёт
  @Roles("ADMIN")    // пользователю с какими ролями будет доступен этот метод
  //@UseGuards(JwtAuthGuard)  // можем тут использовать JwtAuthGuard чтобы ограничить неавторизованным пользователям
                              // доступ к получению списка всех пользователей
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers()
  }

  @ApiOperation({ summary: 'Add role' }) // описание
  @ApiResponse({ status: 200 })  // будет возвращать двухсотый статус код
  @Roles("ADMIN")    // пользователю с какими ролями будет доступен этот метод
  @UseGuards(RolesGuard)
  @Post("/role") // добавляем префикс к эндпойнту
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Ban user' }) // описание
  @ApiResponse({ status: 200 })  // будет возвращать двухсотый статус код
  @Roles("ADMIN")    // пользователю с какими ролями будет доступен этот метод
  @UseGuards(RolesGuard)
  @Post("/ban") // добавляем префикс к эндпойнту
  banUser(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto);
  }
}
