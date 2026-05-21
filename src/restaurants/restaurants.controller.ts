import {
  Body,
  Controller,
  Get,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { ConfigService } from '@nestjs/config';

@Controller('/api/restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly config: ConfigService,
  ) {}

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
  getAllRestaurants(@Query('cuisines') cuisines: string[]) {
    return this.restaurantsService.getAllRestaurants(cuisines);
  }

  //get by id or slug
  @Get(':identifier')
  getRestaurant(@Param('identifier') identifier: string) {
    return this.restaurantsService.getRestaurant(identifier);
  }
}
