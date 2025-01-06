import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UploadedFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreEntity, MovieEntity, ActorEntity } from 'src/core/entity';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import {
  ActorRepository,
  GenreRepository,
  MovieRepository,
} from 'src/core/repository';
import { UploadService } from '../file/file.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepo: MovieRepository,
    @InjectRepository(GenreEntity)
    private readonly genreRepository: GenreRepository,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: ActorRepository,
    private readonly uploadService: UploadService,  // Inject the UploadService
  ) { }

  async create(createMovieDto: CreateMovieDto) {
    try {

      const uploadedVideo = createMovieDto.video
        ? await this.uploadService.uploadFile({
          file: createMovieDto.video,
          destination: 'uploads/videos',
        })
        : null;

      const uploadedImage = createMovieDto.image
        ? await this.uploadService.uploadFile({
          file: createMovieDto.image,
          destination: 'uploads/images',
        })
        : null;

      if (!uploadedVideo?.fileUrl || !uploadedImage?.fileUrl) {
        throw new Error('Video yoki rasmni yuklashda xatolik yuz berdi!');
      }

      const newMovie = this.movieRepo.create({
        video: uploadedVideo.fileUrl,
        image: uploadedImage.fileUrl,
        rating: createMovieDto.rating ?? null,
        title: createMovieDto.title ?? null,
        description: createMovieDto.description ?? null,
        release_date: createMovieDto.release_date ?? null,
        is_premium: createMovieDto.is_premium ?? false,
      });

      await this.movieRepo.save(newMovie);
      return newMovie;

    } catch (error) {
      console.log(error)
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepo.find({
      relations: ['genres', 'actors'],
    });
  }

  async findOne(id: string): Promise<MovieEntity | null> {
    const foundedMovie = await this.movieRepo.findOne({
      where: { id },
      relations: ['genres', 'actors'],
    });

    if (!foundedMovie) {
      throw new NotFoundException('Movie not found');
    }
    return foundedMovie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const foundedMovie = await this.findOne(id);

    if (!foundedMovie) {
      throw new NotFoundException('Movie Not Found');
    }
    return await this.movieRepo.update(
      { id: id },
      {
        video: updateMovieDto?.video,
        rating: updateMovieDto?.rating,
        title: updateMovieDto?.title,
        description: updateMovieDto?.description,
        release_date: updateMovieDto?.release_date,
        is_premium: updateMovieDto?.is_premium,
      },
    );
  }
  async remove(id: string) {
    // Avval filmni topish
    const foundedMovie = await this.movieRepo.findOne({ where: { id } });

    // Agar film topilmasa, xatolik chiqarish
    if (!foundedMovie) {
      throw new NotFoundException('Movie not found');
    }
    // Filmning rasmini o'chirish
    if (foundedMovie.image) {
      await this.uploadService.removeFile({ fileName: foundedMovie.image });
    }
    // Filmni o'chirish
    return await this.movieRepo.delete({ id });
  }

  // Movie'ga Genre qo'shish funksiyasi
  async addGenreToMovie(movieId: string, genreId: string): Promise<MovieEntity> {
    const movie = await this.movieRepo.findOne({
      where: { id: movieId },
      relations: ['genres'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const genre = await this.genreRepository.findOne({ where: { id: genreId } });
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${genreId} not found`);
    }

    if (!movie.genres.some((existingGenre) => existingGenre.id === genre.id)) {
      movie.genres.push(genre);
      await this.movieRepo.save(movie);
    }

    return movie;
  }

  async removeGenreFromMovie(movieId: string, genreId: string): Promise<MovieEntity> {
    const movie = await this.movieRepo.findOne({
      where: { id: movieId },
      relations: ['genres'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const genreIndex = movie.genres.findIndex(
      (existingGenre) => existingGenre.id === genreId,
    );
    if (genreIndex > -1) {
      movie.genres.splice(genreIndex, 1);
      await this.movieRepo.save(movie);
    }

    return movie;
  }

  // Movie'ga Actor qo'shish funksiyasi
  async addActorToMovie(movieId: string, actorId: string): Promise<MovieEntity> {
    const movie = await this.movieRepo.findOne({
      where: { id: movieId },
      relations: ['actors'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const actor = await this.actorRepository.findOne({ where: { id: actorId } });
    if (!actor) {
      throw new NotFoundException(`Actor with ID ${actorId} not found`);
    }

    if (!movie.actors.some((existingActor) => existingActor.id === actor.id)) {
      movie.actors.push(actor);
      await this.movieRepo.save(movie);
    }

    return movie;
  }

  async removeActorFromMovie(movieId: string, actorId: string): Promise<MovieEntity> {
    const movie = await this.movieRepo.findOne({
      where: { id: movieId },
      relations: ['actors'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const actorIndex = movie.actors.findIndex(
      (existingActor) => existingActor.id === actorId,
    );
    if (actorIndex > -1) {
      movie.actors.splice(actorIndex, 1);
      await this.movieRepo.save(movie);
    }

    return movie;
  }
}
