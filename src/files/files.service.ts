import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid'

@Injectable()
export class FilesService {

  async createFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.png' // если расширение неизвестно, тогда можно получить его из названия исходного файла
      const filePath = path.resolve(__dirname, '..', 'static')
      // правильнее использовать асинхронные функции !!!
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true}) // если какой-то папки в этом пути не будет то Node.JS создаст нам её
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer) // второй параметр это буфер, который мы достаём из этого файла
      return fileName;
    } catch(err) {
      throw new HttpException('File creating error occurred', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
