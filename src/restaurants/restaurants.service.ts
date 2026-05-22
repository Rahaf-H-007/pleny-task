import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Restaurant } from './restaurant.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async getAllRestaurants(cuisines?: string[]) {
    // get restaurants based on filter
    const filter = cuisines?.length ? { cuisines: { $in: cuisines } } : {};
    const restaurants = await this.restaurantModel.find(filter);

    if (!restaurants || restaurants.length === 0) {
      throw new NotFoundException('No restaurants found');
    }

    // reverse the coordinates for each restaurant
    return restaurants.map((restaurant) => {
      // convert to an object
      const restaurantObj = restaurant.toObject();

      // flip coordinates on object copy
      const [longitude, latitude] = restaurantObj.location.coordinates;
      restaurantObj.location.coordinates = [latitude, longitude];

      return restaurantObj;
    });
  }

  async getRestaurant(restaurantIdentifier: string) {
    const restaurant = isValidObjectId(restaurantIdentifier)
      ? await this.restaurantModel.findById(restaurantIdentifier)
      : await this.restaurantModel.findOne({ slug: restaurantIdentifier });

    if (!restaurant) {
      throw new NotFoundException('restaurant not found');
    }

    // convert to an object
    const restaurantObj = restaurant.toObject();

    // flip coordinates on object copy
    const [longitude, latitude] = restaurantObj.location.coordinates;
    restaurantObj.location.coordinates = [latitude, longitude];

    return restaurantObj;
  }

  async createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    // generate slug from english name
    const slug = await this.generateSlug(createRestaurantDto.englishName);

    //extract location
    const { location, ...otherRestaurantDetails } = createRestaurantDto;

    //reverse coordinates because thats what mongodb wants
    const [latitude, longitude] = location;
    const geoJsonCoordinates = [longitude, latitude];
    const restaurant = await this.restaurantModel.create({
      ...otherRestaurantDetails,
      slug,
      cuisines: otherRestaurantDetails.cuisines.map((c) => c.toLowerCase()),
      location: {
        type: 'Point',
        coordinates: geoJsonCoordinates,
      },
    });

    return restaurant;
  }

  async getNearbyRestaurants(lat: number, lng: number) {
    const restaurants = await this.restaurantModel.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            // longitude first because of mongodb
            coordinates: [lng, lat],
          },
          // 1km radius
          $maxDistance: 1000,
        },
      },
    });

    return restaurants;
  }

  private async generateSlug(englishName: string): Promise<string> {
    // turn restaurant english name into lowercase then replace spaces with -
    const baseSlug = englishName.trim().toLowerCase().replace(/\s+/g, '-');

    // count all slugs in case restaurants have same names
    const count = await this.restaurantModel.countDocuments({
      slug: { $regex: `^${baseSlug}` },
    });

    //append number to make it unique
    return `${baseSlug}-${count + 1}`;
  }
}
