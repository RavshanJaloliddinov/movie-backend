import { Repository } from "typeorm";
import { Review } from "../entity";

export type ReviewRepository = Repository<Review>