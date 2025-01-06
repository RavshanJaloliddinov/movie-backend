import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MovieEntity } from 'src/core/entity/movie.entity';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Protected } from 'src/common/decorator/protected.decorator';
import { Roles } from '../auth/roles/RolesDecorator';
import { UserRoles } from 'src/common/database/Enums';

@ApiTags('Movies') // Swagger taglari: bu guruhdagi barcha endpointlar 'Movies' ostida ko'rinadi
// @ApiBearerAuth('auth') // Agar autentifikatsiya zarur bo'lsa, token talab qilinadi
@Controller('/movie') // Barcha endpointlar /movie prefiksi bilan boshlanadi
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  // === Create a new movie ===
  @Post('/add')
  // @Protected(true) // Endpoint himoyalangan (faqat avtorizatsiyadan o'tgan foydalanuvchilar uchun)
  // @Roles([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]) // Faqat ADMIN rof li uchun ruxsat berilgan
  @ApiOperation({ summary: 'Create a new movie' }) // Swagger uchun qisqacha tavsif
  @ApiConsumes('multipart/form-data') // Fayl yuklash uchun kerakli header
  @ApiResponse({
    status: 201,
    description: 'The movie has been successfully created.',
    type: MovieEntity,
  }) // Javob turi va status kodi
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 },
    ]),
  ) // Fayllar uchun interceptor: rasm va video qabul qilinadi
  async create(
    @UploadedFiles() files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] },
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<MovieEntity> {
    // Fayllarni alohida ajratib olish
    const image = files?.image?.[0] || null;
    const video = files?.video?.[0] || null;
    // Servis orqali yangi filmni yaratish
    return await this.movieService.create({ ...createMovieDto, video, image });
  }

  // === Get all movies ===
  @Get('/all')
  @ApiOperation({ summary: 'Get all movies' }) // Swagger uchun qisqacha tavsif
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all movies.',
    type: [MovieEntity],
  }) // Javob turi va status kodi
  async findAll() {
    // Barcha filmlarni olish
    return await this.movieService.findAll();
  }

  // === Get a movie by ID ===
  @Get('/:id')
  @ApiOperation({ summary: 'Get a movie by ID' }) // Swagger uchun qisqacha tavsif
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the movie.',
    type: MovieEntity,
  }) // Javob turi va status kodi
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    // ID orqali filmni olish
    return await this.movieService.findOne(id);
  }

  // === Update a movie ===
  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update a movie by ID' }) // Swagger uchun qisqacha tavsif
  @ApiConsumes('multipart/form-data') // Fayl yuklashni qo'llab-quvvatlash
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the movie.',
    type: MovieEntity,
  }) // Javob turi va status kodi
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    // Film ma'lumotlarini yangilash
    return await this.movieService.update(id, updateMovieDto);
  }

  // === Delete a movie ===
  @Delete('delete/:id')
  // @Protected(true) // Endpoint himoyalangan
  // @Roles([UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.USER]) 
  @ApiOperation({ summary: 'Delete a movie by ID' }) // Swagger uchun qisqacha tavsif
  @ApiResponse({ status: 200, description: 'Successfully deleted the movie.' }) // Javob turi va status kodi
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    // ID orqali filmni o'chirish
    return await this.movieService.remove(id);
  }

  // === Add a genre to a movie ===
  @Post(':movieId/genres/:genreId')
  @Protected(true) // Endpoint himoyalangan
  @Roles([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]) // Faqat ADMIN roli uchun ruxsat
  @ApiOperation({ summary: 'Add genre to a movie' }) // Swagger uchun qisqacha tavsif
  @ApiParam({ name: 'movieId', description: 'The ID of the movie', type: String }) // Swagger parametri
  @ApiParam({ name: 'genreId', description: 'The ID of the genre', type: String })
  @ApiResponse({
    status: 200,
    description: 'Successfully added genre to movie',
    type: MovieEntity,
  }) // Javob turi va status kodi
  async addGenreToMovie(
    @Param('movieId') movieId: string,
    @Param('genreId') genreId: string,
  ) {
    // Filmga janr qo'shish
    return this.movieService.addGenreToMovie(movieId, genreId);
  }

  // === Remove a genre from a movie ===
  @Delete(':movieId/genres/:genreId/delete')
  @Protected(true) // Endpoint himoyalangan
  @Roles([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]) // Faqat ADMIN roli uchun ruxsat
  @ApiOperation({ summary: 'Remove genre from a movie' }) // Swagger uchun qisqacha tavsif
  @ApiParam({ name: 'movieId', description: 'The ID of the movie', type: String }) // Swagger parametri
  @ApiParam({ name: 'genreId', description: 'The ID of the genre', type: String })
  @ApiResponse({
    status: 204,
    description: 'Successfully removed genre from movie',
  }) // Javob turi va status kodi
  async removeGenreFromMovie(
    @Param('movieId') movieId: string,
    @Param('genreId') genreId: string,
  ) {
    // Film janrini o'chirish
    return this.movieService.removeGenreFromMovie(movieId, genreId);
  }

  // === Add an actor to a movie ===
  @Post(':movieId/actors/:actorId')
  @Protected(true) // Endpoint himoyalangan
  @Roles([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]) // Faqat ADMIN roli uchun ruxsat
  @ApiOperation({ summary: 'Add actor to a movie' }) // Swagger uchun qisqacha tavsif
  @ApiParam({ name: 'movieId', description: 'The ID of the movie', type: String }) // Swagger parametri
  @ApiParam({ name: 'actorId', description: 'The ID of the actor', type: String })
  @ApiResponse({
    status: 200,
    description: 'Successfully added actor to movie',
    type: MovieEntity,
  }) // Javob turi va status kodi
  async addActorToMovie(
    @Param('movieId') movieId: string,
    @Param('actorId') actorId: string,
  ) {
    // Filmga aktyor qo'shish
    return this.movieService.addActorToMovie(movieId, actorId);
  }cl

  // === Remove an actor from a movie ===
  @Delete(':movieId/actors/:actorId/delete')
  @Protected(true) // Endpoint himoyalangan
  @Roles([UserRoles.ADMIN, UserRoles.SUPER_ADMIN]) // Faqat ADMIN roli uchun ruxsat
  @ApiOperation({ summary: 'Remove actor from a movie' }) // Swagger uchun qisqacha tavsif
  @ApiParam({ name: 'movieId', description: 'The ID of the movie', type: String }) // Swagger parametri
  @ApiParam({ name: 'actorId', description: 'The ID of the actor', type: String })
  @ApiResponse({
    status: 204,
    description: 'Successfully removed actor from movie',
  }) // Javob turi va status kodi
  async removeActorFromMovie(
    @Param('movieId') movieId: string,
    @Param('actorId') actorId: string,
  ) {
    // Film aktyorini o'chirish
    return this.movieService.removeActorFromMovie(movieId, actorId);
  }
}
