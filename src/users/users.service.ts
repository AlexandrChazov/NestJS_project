import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService) {                       // при создании пользователя нам нужно добавлять ему хоть какую-нибудь роль
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("USER");  // получаем роль из БД
    await user.$set('roles', [role.id]) // указываем что роль принадлежит пользователю, метод .$set позволяет перезаписать поле
                                                          // и сразу обновить его внутри БД
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } }); // подтягиваем пользователя сразу с его ролями
                                                                                        // будут подтягиваться все поля, с которыми связан пользователь
    return users;
  }

}
