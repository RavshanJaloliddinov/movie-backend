import { Repository } from "typeorm";
import { WatchedMovieEntity } from "../entity";

export type WatchedMovieRepository = Repository<WatchedMovieEntity>