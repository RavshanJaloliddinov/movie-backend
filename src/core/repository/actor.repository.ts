import { Repository } from "typeorm";
import { ActorEntity } from "../entity/actor.entity";


export type ActorRepository = Repository<ActorEntity>