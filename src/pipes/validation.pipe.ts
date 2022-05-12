import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exeptions/validation.exception';


@Injectable()
export class ValidationPipe implements PipeTransform<any> {   // пайпы могут: преобразовывать входные данные (напр. строку в число), валидировать входные данные
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToInstance(metadata.metatype, value) // формируем объект из примитивов
    const errors = await validate(obj)

    if (errors.length) {
      // console.log(errors);
      let messages = errors.map(err => {
        return `${err.property}: ${Object.values(err.constraints).join(', ')}`
      })
      throw new ValidationException(messages)
    }
    return value;
  }
}

/*
  errors.constraints это объект
  {
    isLength: 'should be more then 4 and less then 16',
    isString: 'should be a string'
  }
*/
