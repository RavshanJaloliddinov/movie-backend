import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { ActorEntity, MovieEntity } from 'src/core/entity';

@Module({ 
  imports: [TypeOrmModule.forFeature([ActorEntity, MovieEntity])],
  providers: [ActorService],
  controllers: [ActorController],
})
export class ActorModule {}
