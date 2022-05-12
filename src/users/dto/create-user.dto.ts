import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
  @IsString({ message: 'should be a string' })
  @IsEmail({}, {message: 'incorrect address'})
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString({ message: 'should be a string' })
  @Length(4, 16, {message: 'should be more then 4 and less then 16'})
  readonly password: string;
}
