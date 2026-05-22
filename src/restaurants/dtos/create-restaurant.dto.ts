import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Restaurant's arabic name" })
  arabicName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Restaurant's english name" })
  englishName: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ApiProperty({ description: "Restaurant's cuisines" })
  cuisines: string[];

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ApiProperty({
    description: "Restaurant's location in [lat, lng]",
    type: 'array',
    items: { type: 'number' },
    example: '[31.055,31.395]',
  })
  location: number[];
}
