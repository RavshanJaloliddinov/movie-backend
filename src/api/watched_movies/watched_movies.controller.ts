import { Controller, Post, Get, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { WatchedMovieService } from './watched_movies.service';
import { WatchedMovieEntity } from 'src/core/entity/watched_movie.entity';
import { UserRoles } from 'src/common/database/Enums';
import { Roles } from '../auth/roles/RolesDecorator';
import { Protected } from 'src/common/decorator/protected.decorator';

@ApiTags('Watched Movies')
@Controller('watched-movies')
@ApiBearerAuth('auth')

export class WatchedMovieController {
  constructor(private readonly watchedMovieService: WatchedMovieService) { }

  @Post(':movieId')

  @HttpCode(HttpStatus.CREATED)
  @Protected(true)
  @Roles([UserRoles.ADMIN]) @ApiOperation({ summary: 'Ko\'rilgan film qo\'shish' })
  @ApiParam({ name: 'movieId', type: 'string', description: 'Ko\'rilgan filmning IDsi' })
  @ApiBody({ schema: { example: { userId: 'user123' } }, description: 'Foydalanuvchi IDsi' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Ko\'rilgan film muvaffaqiyatli qo\'shildi.', type: WatchedMovieEntity })
  async addWatchedMovie(@Param('movieId') movieId: string, @Body('userId') userId: string): Promise<WatchedMovieEntity> {
    return this.watchedMovieService.addWatchedMovie(userId, movieId);
  }

  @Get(':userId')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Foydalanuvchining ko\'rilgan filmlarini olish' })
  @ApiParam({ name: 'userId', type: 'string', description: 'Foydalanuvchi IDsi' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ko\'rilgan filmlar ro\'yxati qaytarildi.', type: [WatchedMovieEntity] })
  async getWatchedMovies(@Param('userId') userId: string): Promise<WatchedMovieEntity[]> {
    return this.watchedMovieService.getWatchedMovies(userId);
  }

  @Delete(':userId/:movieId')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Ko\'rilgan filmni o\'chirish' })
  @ApiParam({ name: 'userId', type: 'string', description: 'Foydalanuvchi IDsi' })
  @ApiParam({ name: 'movieId', type: 'string', description: 'Ko\'rilgan filmning IDsi' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Ko\'rilgan film muvaffaqiyatli o\'chirildi.' })
  async removeWatchedMovie(@Param('userId') userId: string, @Param('movieId') movieId: string): Promise<void> {
    await this.watchedMovieService.removeWatchedMovie(userId, movieId);
  }
}
