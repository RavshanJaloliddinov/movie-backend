import { Controller, Post, Get, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { FavoriteMovieService } from './favorite_movies.service';
import { FavoriteMovieEntity } from 'src/core/entity/favorite_movie.entity';
import { UserRoles } from 'src/common/database/Enums';
import { Roles } from '../auth/roles/RolesDecorator';
import { Protected } from 'src/common/decorator/protected.decorator';

@ApiTags('Favorite Movies')
@Controller('favorite-movies')
@ApiBearerAuth('auth')
export class FavoriteMovieController {
  constructor(private readonly favoriteMovieService: FavoriteMovieService) { }

  @Post(':movieId')
  @Protected(true)
  @Roles([UserRoles.ADMIN, UserRoles.USER])
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Sevimli film qo\'shish' })
  @ApiParam({ name: 'movieId', type: 'string', description: 'Sevimli bo\'lgan filmning IDsi' })
  @ApiBody({ schema: { example: { userId: 'user123' } }, description: 'Foydalanuvchi IDsi' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Sevimli film muvaffaqiyatli qo\'shildi.', type: FavoriteMovieEntity })
  async addFavoriteMovie(@Param('movieId') movieId: string, @Body('userId') userId: string): Promise<FavoriteMovieEntity> {
    return this.favoriteMovieService.addFavoriteMovie(userId, movieId);
  }

  @Get(':userId')
  @Protected(true)
  @Roles([UserRoles.ADMIN, UserRoles.USER])
  @ApiOperation({ summary: 'Foydalanuvchining sevimli filmlarini olish' })
  @ApiParam({ name: 'userId', type: 'string', description: 'Foydalanuvchi IDsi' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Sevimli filmlar ro\'yxati qaytarildi.', type: [FavoriteMovieEntity] })
  async getFavoriteMovies(@Param('userId') userId: string): Promise<FavoriteMovieEntity[]> {
    return this.favoriteMovieService.getFavoriteMovies(userId);
  }

  @Delete(':userId/:movieId')
  @Protected(true)
  @Roles([UserRoles.ADMIN, UserRoles.USER])
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Sevimli filmni o\'chirish' })
  @ApiParam({ name: 'userId', type: 'string', description: 'Foydalanuvchi IDsi' })
  @ApiParam({ name: 'movieId', type: 'string', description: 'Sevimli bo\'lgan filmning IDsi' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Sevimli film muvaffaqiyatli o\'chirildi.' })
  async removeFavoriteMovie(@Param('userId') userId: string, @Param('movieId') movieId: string): Promise<void> {
    await this.favoriteMovieService.removeFavoriteMovie(userId, movieId);
  }
}
