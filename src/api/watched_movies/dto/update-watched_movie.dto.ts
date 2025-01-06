import { PartialType } from '@nestjs/swagger';
import { CreateWatchedMovieDto } from './create-watched_movie.dto';

export class UpdateWatchedMovieDto extends PartialType(CreateWatchedMovieDto) {}
