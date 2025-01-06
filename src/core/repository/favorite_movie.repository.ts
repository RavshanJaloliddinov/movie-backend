import { Repository } from "typeorm";
import { FavoriteMovieEntity } from "../entity/favorite_movie.entity";

export type FavoriteMovieRepository = Repository<FavoriteMovieEntity>