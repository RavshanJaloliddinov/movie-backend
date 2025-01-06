import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { MovieEntity } from "./movie.entity";

@Entity('watched_movies')
export class WatchedMovieEntity extends BaseEntity {
  @Column({ name: 'user_id', type: 'varchar', nullable: false })
  user_id!: string;

  @OneToOne(() => MovieEntity)
  @JoinColumn({ name: 'movie_id' })
  movie!: MovieEntity;
}
