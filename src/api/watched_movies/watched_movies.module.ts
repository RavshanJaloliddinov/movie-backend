import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchedMovieService } from './watched_movies.service';
import { WatchedMovieController } from './watched_movies.controller';
import { WatchedMovieEntity } from 'src/core/entity/watched_movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WatchedMovieEntity])],
  providers: [WatchedMovieService],
  controllers: [WatchedMovieController],
})
export class WatchedMovieModule {}
