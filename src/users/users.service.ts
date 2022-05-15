import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private userRepository: typeof User,  // при создании пользователя нам нужно добавлять ему хоть какую-нибудь роль
    private roleService: RolesService
  ) {
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("ADMIN");  // получаем роль из БД
    await user.$set('roles', [role.id]) // указываем что роль принадлежит пользователю, метод .$set позволяет перезаписать поле
                                                          // и сразу обновить его внутри БД. Т.е. мы добавили роль в базу данных
    user.roles = [role]  // добавляем пользователю поле "roles" с созданной ролью, чтобы потом поместить эти данные в токен
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } }); // подтягиваем пользователя сразу с его ролями
                                                                                        // будут подтягиваться все поля, с которыми связан пользователь
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } })
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const role = await this.roleService.getRoleByValue(dto.value)
    if (role && user) {
      await user.$add('role', role.id) // функция $set инициализирует значение, а $add к проинициализированному объекту добаляет ещё одино значение
      return dto;
    }
    throw new HttpException("User or role not found", HttpStatus.NOT_FOUND)
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId); // получаем пользователя по id
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    }
    user.banned = true;              // перезаписываем поля
    user.banReason = dto.banReason;  // перезаписываем поля
    await user.save();               // обновляем пользователя в базе данных
    return user;
  }

}
