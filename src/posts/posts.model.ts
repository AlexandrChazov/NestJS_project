import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { User } from '../users/users.model';

interface PostCreationAttrs {  // определяем какие поля нужны нам для создания объекта
  title: string;
  content: string;
  image: string;  // название изображения будем генерировать случайным образом
  userId: number;
}

@Table({ tableName: 'posts' }) // этот декоратор для того, чтобы класс стал таблицей в БД
export class Post extends Model<Post, PostCreationAttrs> {

  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'About whether', description: 'Post title' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({ example: "'It's rainy today", description: "Post text" })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ApiProperty({ example: 'src/assets/images/sun.png', description: 'Link to image' })
  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => User) // указываем на какую модель ссылается форейн ключь
  @Column({ type: DataType.INTEGER }) // создаём в БД колонку с userId
  userId: number;

  // связь один ко многим (один пользователь может иметь много постов)
  // тоесть каждый пост принадлежит какому-то одному пользователю
  @BelongsTo(() => User)  // помечаем что пост принадлежит пользователю
  author: User;
}
