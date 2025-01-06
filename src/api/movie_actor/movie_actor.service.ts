// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { MovieActor } from 'src/core/entity';
// import { MovieActorRepository } from 'src/core/repository';
// import { CreateMovieActorDto } from './dto/create-movie_actor.dto';
// import { UpdateMovieActorDto } from './dto/update-movie_actor.dto';

// @Injectable()
// export class MovieActorService {
//   constructor(
//     @InjectRepository(MovieActor) private movieActorRepo: MovieActorRepository,
//   ) {}

//   async create(createMovieActorDto: CreateMovieActorDto) {
//     const newMovieActor = this.movieActorRepo.create({
//       movie_id: createMovieActorDto.movie_id,
//       actor_id: createMovieActorDto.actor_id,
//     });

//     await this.movieActorRepo.save(newMovieActor);
//     return newMovieActor;
//   }

//   async findAll(): Promise<MovieActor[]> {
//     return await this.movieActorRepo.find();
//   }

//   async findOne(id: string): Promise<MovieActor | null> {
//     const foundedMovieActor = await this.movieActorRepo.findOne({
//       where: { id },
//     });
//     if (!foundedMovieActor) {
//       throw new NotFoundException('Movie Actor not found');
//     }
//     return foundedMovieActor;
//   }

//   async update(id: string, updateMovieActorDto: UpdateMovieActorDto) {
//     const foundedMovieActor = this.findOne(id);

//     if (!foundedMovieActor) {
//       throw new NotFoundException('Movie Actor not found');
//     }
//     return await this.movieActorRepo.update(
//       { id: id },
//       {
//         movie_id: updateMovieActorDto.movie_id,
//         actor_id: updateMovieActorDto.actor_id,
//       },
//     );
//   }

//   async remove(id: string) {
//     const foundedMovieActor = await this.findOne(id);

//     if (!foundedMovieActor) {
//       throw new NotFoundException('Movie actor not found');
//     }
//     return await this.movieActorRepo.delete({ id });
//   }
// }
