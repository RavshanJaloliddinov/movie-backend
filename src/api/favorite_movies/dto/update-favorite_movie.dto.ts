import { PartialType } from '@nestjs/swagger';
import { CreateFavoriteMovieDto } from './create-favorite_movie.dto';

export class UpdateFavoriteMovieDto extends PartialType(CreateFavoriteMovieDto) {}
