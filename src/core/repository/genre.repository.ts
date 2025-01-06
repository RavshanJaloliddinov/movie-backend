import { Repository } from "typeorm";
import { GenreEntity } from "../entity";

export type GenreRepository = Repository<GenreEntity>