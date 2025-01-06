// import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
// import { MovieGenreService } from "./movie_genre.service";
// import { CreateMovieGenreDto } from "./dto";

// @Controller('/movie_genre')
// export class MovieGenreController {
//     constructor(private readonly movieGenreService: MovieGenreService){}

//     @Post('/add')
//     async create(@Body() createMovieGenreDto: CreateMovieGenreDto) {
//         return await this.movieGenreService.create(createMovieGenreDto)
//     }

//     @Get('/all')
//     async findAll() {
//         return await this.movieGenreService.findAll()
//     }

//     @Get('/:id')
//     async findone(@Param('id', ParseUUIDPipe) id: string) {
//         return await this.movieGenreService.findOne(id)
//     }

//     @Delete('/delete/:id')
//     async delete(@Param('id', ParseUUIDPipe) id: string){
//         return await this.movieGenreService.remove(id)
//     }
// }