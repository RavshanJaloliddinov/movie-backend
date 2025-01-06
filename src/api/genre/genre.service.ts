import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreEntity, MovieEntity } from 'src/core/entity';
import { CreateGenreDto, UpdateGenreDto } from './dto';
import { GenreRepository, MovieRepository } from 'src/core/repository';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(@InjectRepository(GenreEntity) private genreRepossitory: Repository<GenreEntity>) { }
  async create(createGenreDto: CreateGenreDto) {
    const newGenre = this.genreRepossitory.create({
      genre_name: createGenreDto.genre_name,
    });

    await this.genreRepossitory.save(newGenre);
    return newGenre;
  }

  async findAll(): Promise<GenreEntity[]> {
    return await this.genreRepossitory.find({
      relations: ['movies']
    });
  }

  async findOne(id: string): Promise<GenreEntity | null> {
    const foundedGenre = await this.genreRepossitory.findOne({ where: { id }, relations: ['movies'] });

    if (!foundedGenre) {
      throw new NotFoundException('Genre not found')
    }

    return foundedGenre
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    const foundedGenre = await this.genreRepossitory.findOne({
      where: { id },
    });

    if (!foundedGenre) {
      throw new NotFoundException('Genre Not Found');
    }
    return await this.genreRepossitory.update(
      { id: id },
      {
        genre_name: updateGenreDto?.genre_name,
      },
    );
  }

  async remove(id: string) {
    const foundedGenre = await this.genreRepossitory.findOne({
      where: { id },
    });
    if (!foundedGenre) {
      throw new NotFoundException('Genre not found');
    }
    return await this.genreRepossitory.delete({ id });
  }
}
