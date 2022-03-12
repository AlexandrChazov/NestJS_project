import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

main();
