import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/core/entity/movie.entity';
import { GenreEntity } from 'src/core/entity/genre.entity';
import { ActorEntity } from 'src/core/entity/actor.entity';
import { MulterModule } from '@nestjs/platform-express'; // Multer fayl yuklashni qo'llab-quvvatlash uchun
import { UploadService } from '../file/file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, GenreEntity, ActorEntity]), 
  ],
  controllers: [MovieController],
  providers: [MovieService, UploadService], 
})
export class MovieModule {}
