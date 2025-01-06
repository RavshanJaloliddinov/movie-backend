import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('review')
export class Review extends BaseEntity {
  @Column({ name: 'user_id', type: 'varchar', nullable: false })
  user_id!: string;

  @Column({ name: 'movie_id', type: 'varchar',nullable: false })
  movie_id!: string;

  @Column({ name: 'comment', type: 'text',nullable: false })
  comment!: string;
}
