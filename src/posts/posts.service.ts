import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel(Post) private postRepository: typeof Post,  // инжектим модель Post чтобы вносить изменения в таблицу с постами в БД
    private filesService: FilesService  // в пост модуль мы импортнули файл модуль и поэтому теперь можем использовать файл сервис
  ) {}

  async create(dto: CreatePostDto, image:any) {
    const fileName = await this.filesService.createFile(image)
    const post = await this.postRepository.create({ ...dto, image: fileName })
    return post;
  }
}
