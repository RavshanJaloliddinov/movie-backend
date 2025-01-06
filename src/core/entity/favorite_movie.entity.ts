// favorite_movie.entity.ts
import { BaseEntity } from "src/common/database/BaseEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity"; // UserEntity import qilamiz
import { MovieEntity } from "./movie.entity"; // MovieEntity import qilamiz

@Entity('favorite_movies')
export class FavoriteMovieEntity extends BaseEntity {
  @Column({ name: 'user_id', type: 'varchar', nullable: false })
  user_id!: string;

  @ManyToOne(() => UserEntity, (user) => user.favoriteMovies) // UserEntityga ManyToOne munosabati
  @JoinColumn({ name: 'user_id' }) // `user_id` orqali bog'lanadi
  user!: UserEntity;

  @ManyToOne(() => MovieEntity) // MovieEntity bilan ManyToOne munosabati
  @JoinColumn({ name: 'movie_id' }) // `movie_id` orqali MovieEntity bilan bog'lanadi
  movie!: MovieEntity;
}
