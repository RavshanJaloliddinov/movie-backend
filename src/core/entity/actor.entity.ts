import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity('actors')
export class ActorEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text' })
  biography!: string;

  @ManyToMany(() => MovieEntity, (movie) => movie.actors)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: { name: 'actor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'movie_id', referencedColumnName: 'id' },
  })
  movies!: MovieEntity[];
}
