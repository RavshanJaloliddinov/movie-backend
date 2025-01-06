import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { GenreEntity, MovieEntity } from 'src/core/entity';
import { MovieService } from '../movie/movie.service';

@Module({
    imports: [TypeOrmModule.forFeature([GenreEntity, MovieEntity])],
    providers: [GenreService],  
    controllers: [GenreController],  
})
export class GenreModule { }
 