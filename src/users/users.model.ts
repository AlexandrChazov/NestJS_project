import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { Post } from '../posts/posts.model';

interface UserCreationAttrs {  // определяем какие поля нужны нам для создания объекта
  email: string;
  password: string;
}

@Table({ tableName: 'users' }) // этот декоратор для того, чтобы класс стал таблицей в БД
export class User extends Model<User, UserCreationAttrs> {

  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'false', description: 'Whether user is banned or not' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'spam', description: 'Ban reason' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  // пользователь принадлежит ко многим ролям: ADMIN, USER
  @BelongsToMany(() => Role, () => UserRoles)  // указываем с какой сущностью мы связываем и через какую таблицу мы это делаем
  roles: Role[];

  // один пользователь имеет много постов
  @HasMany(() => Post)
  post: Post[];   // массив постов типа Post
}
