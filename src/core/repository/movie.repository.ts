import { Repository } from "typeorm";
import { MovieEntity } from "../entity";

export type MovieRepository = Repository<MovieEntity>