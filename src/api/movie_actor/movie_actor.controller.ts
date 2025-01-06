// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   ParseUUIDPipe,
//   Patch,
//   Post,
// } from '@nestjs/common';
// import { MovieActorService } from './movie_actor.service';
// import { CreateMovieActorDto } from './dto/create-movie_actor.dto';
// import { UpdateMovieActorDto } from './dto/update-movie_actor.dto';

// @Controller('/movie_actor')
// export class MovieActorController {
//   constructor(private readonly movieActorService: MovieActorService) {}

//   @Post('/add')
//   async create(@Body() createMovieActorDto: CreateMovieActorDto) {
//     return await this.movieActorService.create(createMovieActorDto);
//   }

//   @Get('/all')
//   async findAll() {
//     return await this.movieActorService.findAll();
//   }

//   @Get('/:id')
//   async findOne(@Param('id', ParseUUIDPipe) id: string) {
//     return await this.movieActorService.findOne(id);
//   }

//   @Patch('/update/:id')
//   async update(
//     @Param('id', ParseUUIDPipe) id: string,
//     @Body() updateMovieActorDto: UpdateMovieActorDto,
//   ) {
//     return await this.movieActorService.update(id, updateMovieActorDto)
//   }

//   @Delete('/delete/:id')
//   async delete(@Param('id', ParseUUIDPipe) id: string){
//     return await this.movieActorService.remove(id)
//   }
// }
