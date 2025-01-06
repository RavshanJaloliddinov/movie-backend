import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity('genre')
export class GenreEntity extends BaseEntity {
  @Column({ name: 'genre_name', type: 'varchar' })
  genre_name!: string;

  @ManyToMany(() => MovieEntity, (movie) => movie.genres)
  movies: MovieEntity[]; 
}
