import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {  // определяем какие поля нужны нам для создания объекта
  value: string;
  description: string;
}

@Table({ tableName: 'roles' }) // этот декоратор для того, чтобы класс стал таблицей в БД
export class Role extends Model<Role, RoleCreationAttrs> {

  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: "Unique user's role" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)  // указываем с какой сущностью мы связываем и через какую таблицу мы это делаем
  users: User[];
}
