import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteMovieEntity } from 'src/core/entity/favorite_movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteMovieService {
  constructor(
    @InjectRepository(FavoriteMovieEntity)
    private readonly favoriteMovieRepository: Repository<FavoriteMovieEntity>, // Repositorydan to'g'ridan-to'g'ri foydalanish
  ) {}

  // Sevimli filmni qo'shish
  async addFavoriteMovie(userId: string, movieId: string): Promise<FavoriteMovieEntity> {
    const favoriteMovie = this.favoriteMovieRepository.create({
      user_id: userId,
      movie: { id: movieId }, // MovieEntityga id bilan bog'lanadi
    });
    return this.favoriteMovieRepository.save(favoriteMovie);
  }

  // Foydalanuvchining barcha sevimli filmlarini olish
  async getFavoriteMovies(userId: string): Promise<FavoriteMovieEntity[]> {
    return this.favoriteMovieRepository.find({
      where: { user_id: userId }, // Foydalanuvchining IDsi bo'yicha filtr
      relations: ['movie'], // MovieEntity bilan bog'langan filmlar
    });
  }

  // Sevimli filmdan olib tashlash
  async removeFavoriteMovie(userId: string, movieId: string): Promise<void> {
    await this.favoriteMovieRepository.delete({
      user_id: userId,
      movie: { id: movieId }, // MovieEntity bo'yicha movie_id bilan o'chirish
    });
  }
}
