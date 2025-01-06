import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'src/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';

export default class Application {
  public static async main(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    // COMPRESSION
    app.use(compression())

    app.setGlobalPrefix("api/v1");
    app.useGlobalPipes(new ValidationPipe())
    // Swagger documentation
    const swaggerConfig = new DocumentBuilder() 
    
      .setTitle('Movie')
      .setDescription('movie site for watching films')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
        'auth',
      )
      .build()
    const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('api', app, documentFactory)


    await app.listen(config.PORT, () => {
      console.log(`Server running on ${config.PORT} port`);
    });
  }

}
