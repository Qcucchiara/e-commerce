import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtGuard } from 'src/auth/guards';

@UseGuards(JwtGuard)
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() createReviewDto) {
    return this.reviewService.create();
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto) {
    return this.reviewService.update();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove();
  }
}
