import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { config } from 'src/config';
import { UploadModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { CheckAuthGuard } from './auth/user/check-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { GenreModule } from './genre/genre.module';
import { MovieModule } from './movie/movie.module';
import { ActorModule } from './actor/actor.module';
import { ReviewModule } from './review/review.module';
import { FavoriteMovieModule } from './favorite_movies/favorite_movies.module';
import { WatchedMovieModule } from './watched_movies/watched_movies.module';
import { MulterModule } from '@nestjs/platform-express';
import { DeviceModule } from './device/device.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'), // Statik fayllar papkasi
      serveRoot: '/uploads', // URL orqali ulash: http://localhost:4000/uploads
    }),
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      url: config.DB_URL,
      entities: ["dist/core/entity/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './uploads', // Fayllar saqlanadigan joy
    }),
    RedisModule.forRoot({
      type: "single",
      options: {
        port: config.REDIS_PORT,
        host: "localhost"
      }
    }),
    JwtModule.register({
      secret: config.JWT_SECRET,
      global: true,
    }),
    UploadModule,
    AuthModule,
    UserModule,
    GenreModule,
    MovieModule,
    ActorModule,
    ReviewModule,
    FavoriteMovieModule,
    WatchedMovieModule,
    DeviceModule,
  ],
  providers: [
    {
      useClass: CheckAuthGuard,
      provide: APP_GUARD
    }
  ],

})
export class AppModule { }
