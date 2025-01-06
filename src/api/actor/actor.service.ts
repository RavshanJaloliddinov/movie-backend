import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity, MovieEntity } from 'src/core/entity';
import { ActorRepository, MovieRepository } from 'src/core/repository';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: ActorRepository, 
    @InjectRepository(MovieEntity)
    private readonly movieRepository: MovieRepository,
  ) {}

  async createActor(name: string, biography: string): Promise<ActorEntity> {
    const actor = this.actorRepository.create({ name, biography });
    return this.actorRepository.save(actor);
  }

  async getActors(): Promise<ActorEntity[]> {
    return this.actorRepository.find({ relations: ['movies'] });
  }

  async addActorToMovie(actorId: string, movieId: string): Promise<ActorEntity> {
    const actor = await this.actorRepository.findOneOrFail({ where: { id: actorId }, relations: ['movies'] });
    const movie = await this.movieRepository.findOneOrFail({ where: { id: movieId } });
    actor.movies.push(movie);
    return this.actorRepository.save(actor);
  }
}
