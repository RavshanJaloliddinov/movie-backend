// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { MovieGenre } from 'src/core/entity';
// import { MovieGenreRepository } from 'src/core/repository';
// import { CreateMovieGenreDto } from './dto';

// @Injectable()
// export class MovieGenreService {
//   constructor(
//     @InjectRepository(MovieGenre) private movieGenreRepo: MovieGenreRepository,
//   ) {}

//   async create(createMovieGenreDto: CreateMovieGenreDto) {
//     const newMovieGenre = this.movieGenreRepo.create({
//       movie: createMovieGenreDto.movie,
//       genre: createMovieGenreDto.genre,
//     });

//     await this.movieGenreRepo.save(newMovieGenre);
//     return newMovieGenre;
//   }

//   async findAll(): Promise<MovieGenre[]> {
//     return await this.movieGenreRepo.find();
//   }

//   async findOne(id: string): Promise<MovieGenre> {
//     const foundedMovieGenre = await this.movieGenreRepo.findOne({
//       where: { id },
//     });
//     if (!foundedMovieGenre) {
//       throw new NotFoundException('Movie Genre Not Found');
//     }

//     return foundedMovieGenre;
//   }

//   async remove(id: string) {
//     const foundedMovieGenre = await this.findOne(id); // `await` bilan to'g'rilandi

//     if (!foundedMovieGenre) {
//       throw new NotFoundException('Movie Genre Not Found');
//     }
//     return await this.movieGenreRepo.delete({ id });
//   }
// }
