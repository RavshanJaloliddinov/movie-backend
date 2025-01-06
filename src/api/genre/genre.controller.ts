import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { CreateGenreDto, UpdateGenreDto } from "./dto";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { GenreEntity } from "src/core/entity";
import { UserRoles } from "src/common/database/Enums";
import { Roles } from "../auth/roles/RolesDecorator";
import { Protected } from "src/common/decorator/protected.decorator";

@Controller('/genre')
@ApiBearerAuth('auth')

export class GenreController {
    constructor(private readonly genreService: GenreService) { }

    @Post('/add')
    @Protected(true)
    @Roles([UserRoles.ADMIN, UserRoles.USER])
    @ApiOperation({ summary: 'Add a new genre' })
    @ApiResponse({
        status: 201,
        description: 'The genre has been successfully created.',
        type: GenreEntity,
    })
    async create(@Body() createGenreDto: CreateGenreDto) {
        return await this.genreService.create(createGenreDto);
    }

    @Get('/all')
    @Protected(true)
    @Roles([UserRoles.ADMIN, UserRoles.USER])
    @ApiOperation({ summary: 'Get all genres' })
    @ApiResponse({
        status: 200,
        description: 'Return all genres.',
        type: [GenreEntity],
    })
    async findAll() {
        return await this.genreService.findAll();
    }

    @Get('/:id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    @ApiOperation({ summary: 'Get a genre by ID' })
    @ApiResponse({
        status: 200,
        description: 'Return the genre by the given ID.',
        type: GenreEntity,
    })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.genreService.findOne(id);
    }

    @Patch('/update/:id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    @ApiOperation({ summary: 'Update a genre by ID' })
    @ApiResponse({
        status: 200,
        description: 'The genre has been successfully updated.',
        type: GenreEntity,
    })
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateGenreDto: UpdateGenreDto
    ) {
        return await this.genreService.update(id, updateGenreDto);
    }

    @Delete('/delete/:id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    @ApiOperation({ summary: 'Delete a genre by ID' })
    @ApiResponse({
        status: 200,
        description: 'The genre has been successfully deleted.',
    })
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        return await this.genreService.remove(id);
    }
}
