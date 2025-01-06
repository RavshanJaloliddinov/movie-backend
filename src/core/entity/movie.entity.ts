import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { GenreEntity } from './genre.entity';
import { FavoriteMovieEntity } from './favorite_movie.entity';
import { ActorEntity } from './actor.entity';

@Entity('movies')
export class MovieEntity extends BaseEntity {
  @Column({ name: "video", type: 'varchar', nullable: true })
  video?: string;

  @Column({ name: "image", type: 'varchar', nullable: true })
  image?: string;

  @Column({ name: 'rating', type: 'varchar', nullable: true })
  rating?: number;

  @Column({ name: "title", type: 'varchar', nullable: true })
  title?: string;

  @Column({ name: "description", type: 'varchar', nullable: true })
  description?: string;

  @Column({ name: 'release_date', type: Date, nullable: true })
  release_date?: Date;

  @Column({ name: "is_premium", type: 'boolean', nullable: true, default: true })
  is_premium?: boolean;

  @ManyToMany(() => GenreEntity, (genre) => genre.movies, { nullable: true })
  @JoinTable({
    name: 'movie_genre',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' }
  })
  genres?: GenreEntity[];

  @OneToOne(() => FavoriteMovieEntity, (favoriteMovie) => favoriteMovie.movie, { nullable: true })
  favoriteMovie?: FavoriteMovieEntity;

  @ManyToMany(() => ActorEntity, (actor) => actor.movies, { nullable: true })
  actors?: ActorEntity[];


  // @ManyToOne(() => UserEntity, user => user.favoriteMovies)
  // user: UserEntity; 
  // @ManyToMany(() => Actor, (actor) => actor.movies) // Actor bilan bog'lanish to'g'rilandi
  // @JoinTable({
  //   name: 'movie_actor',  // Bu orqali TypeORM 'movie_actor' jadvalini avtomatik yaratadi
  //   joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' }
  // })
  // actors: Actor[];
}



