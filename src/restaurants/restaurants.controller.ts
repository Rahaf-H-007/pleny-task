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

@Controller('/api/restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  createRestaurant(@Body() body: CreateRestaurantDto) {
    return this.restaurantsService.createRestaurant(body);
  }

  //get nearby restaurants
  @Get('/nearby')
  getNearbyRestaurants(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
  ) {
    return this.restaurantsService.getNearbyRestaurants(lat, lng);
  }

  @Get()
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
  getRestaurant(@Param('identifier') identifier: string) {
    return this.restaurantsService.getRestaurant(identifier);
  }
}
