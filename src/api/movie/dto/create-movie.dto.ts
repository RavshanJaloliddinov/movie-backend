import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Filmning sarlavhasi',
    example: 'Inception',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Filmning video fayli',
    type: 'string',
    format: 'binary',
    example: 'movie.mp4',
    required: false,
  })
  @IsOptional()
  video?: Express.Multer.File;

  @ApiProperty({
    description: 'Filmning rasmi',
    type: 'string',
    format: 'binary',
    example: 'image.png',
    required: false,
  })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty({
    description: 'Filmning reytingi',
    example: 8.8,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiProperty({
    description: 'Filmning chiqish sanasi',
    example: '2010-07-16T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  release_date?: Date;

  @ApiProperty({
    description: 'Film premiummi?',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_premium?: boolean;

  @ApiProperty({
    description: "Filmning ta'rifi",
    example: 'Skilled thief, redemption opportunity through inception.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
