import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {

  constructor(
    private postService: PostsService    // инжектим сюда PostsService, чтобы его можно было
  ) {}                                    // использовать в методе createPost()

  @Post()  // помечаем что это пост запрос
  @UseInterceptors(FileInterceptor('image')) // декаратор нужен для работы с файлами. 'image' - имя переменной, в которую положится файл
  createPost(
    @Body() dto: CreatePostDto,  // декоратор @Body() помечает что dto - это тело запроса
    @UploadedFile() image // в Nest.js уже встроен пакет для работы с файлами поэтому помечаем файл декоратором @UploadedFile()
  ) {
    return this.postService.create(dto, image)
  }
}
