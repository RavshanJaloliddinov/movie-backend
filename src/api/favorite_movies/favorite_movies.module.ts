import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteMovieService } from './favorite_movies.service';
import { FavoriteMovieController } from './favorite_movies.controller';
import { FavoriteMovieEntity } from 'src/core/entity/favorite_movie.entity';
import { MovieEntity } from 'src/core/entity/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteMovieEntity, MovieEntity])], // Entitylarni TypeORMga qo'shish
  controllers: [FavoriteMovieController],
  providers: [FavoriteMovieService], // FavoriteMovieRepositoryni olib tashlash
  exports: [FavoriteMovieService], // Agar boshqa modullarga eksport qilishingiz kerak bo'lsa
})
export class FavoriteMovieModule {}
