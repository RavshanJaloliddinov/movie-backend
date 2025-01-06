import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from './dto';

@Controller('/review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('/add')
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(createReviewDto);
  }

  @Get('/all')
  async findAll() {
    return await this.reviewService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.reviewService.findOne(id);
  }

  @Patch('/update/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewService.update(id, updateReviewDto)
  }

  @Delete('/delete/:id')
  async delete(@Param('id', ParseUUIDPipe) id: string){
    return await this.reviewService.remove(id)
  }
}
