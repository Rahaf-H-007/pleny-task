import {
  Body,
  Controller,
  Get,
  Param,
  ParseFloatPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('/api/restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @ApiOperation({ summary: 'Create a restaurant' })
  @ApiResponse({ status: 201, description: 'Restaurant created successfully' })
  @Post()
  createRestaurant(@Body() body: CreateRestaurantDto) {
    return this.restaurantsService.createRestaurant(body);
  }

  //get nearby restaurants
  @Get('/nearby')
  @ApiOperation({
    summary: 'Get restaurants within a 1KM radius',
  })
  @ApiResponse({ status: 200, description: 'Restaurants fetched successfully' })
  @ApiQuery({
    name: 'lat',
    required: true,
    type: 'number',
    description: 'Latitutde',
    example: '32.025',
  })
  @ApiQuery({
    name: 'lng',
    required: true,
    type: 'number',
    description: 'Longitude',
    example: '45.544',
  })
  getNearbyRestaurants(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
  ) {
    return this.restaurantsService.getNearbyRestaurants(lat, lng);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all restaurants and filter by cuisines if provided',
  })
  @ApiResponse({ status: 200, description: 'Restaurants fetched successfully' })
  @ApiQuery({
    name: 'cuisines',
    required: false,
    type: 'array',
    items: { type: 'string' },
    description: 'Filter by cuisines',
    example: 'burger',
  })
  getAllRestaurants(@Query('cuisines') cuisines?: string | string[]) {
    let processedCuisines: string[] | undefined;

    if (!cuisines) {
      processedCuisines = undefined;
    } else if (Array.isArray(cuisines)) {
      processedCuisines = cuisines;
    } else {
      processedCuisines = [cuisines];
    }
    return this.restaurantsService.getAllRestaurants(processedCuisines);
  }

  //get by id or slug
  @Get(':identifier')
  @ApiOperation({
    summary: 'Get restaurant using id or slug',
  })
  @ApiResponse({ status: 200, description: 'restaurant fetched successfully' })
  getRestaurant(@Param('identifier') identifier: string) {
    return this.restaurantsService.getRestaurant(identifier);
  }
}
