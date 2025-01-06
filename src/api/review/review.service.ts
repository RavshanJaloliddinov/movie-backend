import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/core/entity';
import { ReviewRepository } from 'src/core/repository';
import { CreateReviewDto, UpdateReviewDto } from './dto';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private reviewRepo: ReviewRepository) {}

  async create(createReviewDto: CreateReviewDto) {
    try {
      const newReview = this.reviewRepo.create({
        user_id: createReviewDto.user_id,
        movie_id: createReviewDto.movie_id,
        comment: createReviewDto.comment,
      });
      await this.reviewRepo.save(newReview);
      return newReview;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async findAll(): Promise<Review[]> {
    try {
      return await this.reviewRepo.find();
    } catch (error) {
      throw new NotFoundException('Data not Found');
    }
  }

  async findOne(id: string): Promise<Review | null> {
    try {
      const foundedReview = await this.reviewRepo.findOne({
        where: { id },
      });

      if (!foundedReview) {
        throw new NotFoundException('Review Not found');
      }
      return foundedReview;
    } catch (error) {
      throw new BadRequestException('Your id is not valid, Bad request');
    }
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    try {
      const foundedReview = await this.findOne(id);

      if (!foundedReview) {
        throw new NotFoundException('Review not found');
      }
      return await this.reviewRepo.update(
        { id: id },
        {
          user_id: updateReviewDto.user_id,
          movie_id: updateReviewDto.movie_id,
          comment: updateReviewDto.comment,
        },
      );
    } catch (error) {
      throw new BadRequestException('Bad request error, nothing is changed');
    }
  }

  async remove(id: string) {
    try {
      const foundedReview = await this.findOne(id);

      if (!foundedReview) {
        throw new NotFoundException('Review Not Found');
      }
      return await this.reviewRepo.delete({ id });
    } catch (error) {
      throw new BadRequestException('UUID is not valid');
    }
  }
}
