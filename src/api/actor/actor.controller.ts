import { Controller, Post, Get, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ActorService } from './actor.service';
import { UserRoles } from 'src/common/database/Enums';
import { Protected } from 'src/common/decorator/protected.decorator';
import { Roles } from '../auth/roles/RolesDecorator';
import { ActorEntity } from 'src/core/entity';
import { CreateActorDto } from './dto';

@ApiTags('Actors')
@Controller('actors')
@ApiBearerAuth('auth')
export class ActorController {
  constructor(private readonly actorService: ActorService) { }

  @Post()
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Yangi aktor qo\'shish' })
  @ApiBody({ schema: { example: { name: 'Actor Name', biography: 'Biography of the actor' } }, description: 'Aktor haqida ma\'lumotlar' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Aktor muvaffaqiyatli qo\'shildi.', type: ActorEntity })
  async createActor(
    @Body('name') name: string,
    @Body('biography') biography: string,
  ): Promise<ActorEntity> {
    return this.actorService.createActor(name, biography);
  }

  @Get()
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Barcha aktorlarni olish' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Aktorlar ro\'yxati qaytarildi.', type: [CreateActorDto] })
  async getActors(): Promise<ActorEntity[]> {
    return this.actorService.getActors();
  }

  @Post(':actorId/movies/:movieId')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Aktorni filmga bog\'lash' })
  @ApiParam({ name: 'actorId', type: 'string', description: 'Aktor IDsi' })
  @ApiParam({ name: 'movieId', type: 'string', description: 'Film IDsi' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Aktor muvaffaqiyatli filmga bog\'landi.', type: ActorEntity })
  async addActorToMovie(
    @Param('actorId') actorId: string,
    @Param('movieId') movieId: string,
  ): Promise<ActorEntity> {
    return this.actorService.addActorToMovie(actorId, movieId);
  }
}
