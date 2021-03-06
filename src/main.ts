import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function main() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS project')
    .setDescription('by Alexandr Chazov')
    .setVersion('1.0.0')
    .addTag('REST API documentation')
    .build()  // собрать объект из вышеперечисленного
  const document = SwaggerModule.createDocument(app, config)  // создаём объект документации
  SwaggerModule.setup('api/docs', app, document)  // указываем префикс, по которому будет доступна документация в браузере
  // app.useGlobalGuards(JwtAuthGuard)  таким образом можно ограничивать доспут до всех эндпойнтов приложения

  app.useGlobalPipes(new ValidationPipe()) // пайпы, так же как и гварды, можно указывать глобально

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

main();
