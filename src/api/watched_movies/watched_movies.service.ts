import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WatchedMovieEntity } from 'src/core/entity/watched_movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WatchedMovieService {
  constructor(
    @InjectRepository(WatchedMovieEntity)
    private readonly watchedMovieRepository: Repository<WatchedMovieEntity>,
  ) {}

  async addWatchedMovie(userId: string, movieId: string): Promise<WatchedMovieEntity> {
    const watchedMovie = this.watchedMovieRepository.create({
      user_id: userId,
      movie: { id: movieId },
    });
    return this.watchedMovieRepository.save(watchedMovie);
  }

  async getWatchedMovies(userId: string): Promise<WatchedMovieEntity[]> {
    return this.watchedMovieRepository.find({
      where: { user_id: userId },
      relations: ['movie'],
    });
  }

  async removeWatchedMovie(userId: string, movieId: string): Promise<void> {
    await this.watchedMovieRepository.delete({
      user_id: userId,
      movie: { id: movieId },
    });
  }
}
