import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getFollows(userId: string) {
    // find user
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userObjectId = new Types.ObjectId(userId);
    const favoriteCuisines = user.favCuisines;

    const result = await this.userModel.aggregate([
      // find all user ids that are not userIf and have same fav cuisines
      {
        $match: {
          _id: { $ne: userObjectId },
          favCuisines: { $in: favoriteCuisines },
        },
      },
      // group them
      {
        $group: {
          _id: null,
          matchedUsers: {
            $push: { _id: '$_id', fullName: '$fullName', email: '$email' },
          },
          matchedUserIds: { $push: '$_id' },
        },
      },

      // search for restaurants followed by these users
      {
        $lookup: {
          from: 'userrestaurants',
          localField: 'matchedUserIds',
          foreignField: 'user',
          as: 'followedRelations',
        },
      },
      // Unwind to get restaurant ids
      {
        $unwind: {
          path: '$followedRelations',
          preserveNullAndEmptyArrays: true,
        },
      },

      // get restaurant details
      {
        $lookup: {
          from: 'restaurants',
          localField: 'followedRelations.restaurant',
          foreignField: '_id',
          as: 'restaurantDetails',
        },
      },
      {
        $unwind: {
          path: '$restaurantDetails',
          preserveNullAndEmptyArrays: true,
        },
      },

      // regroup to create unique lists
      {
        $group: {
          _id: null,
          users: { $first: '$matchedUsers' },
          // $addToSet because we dont want duplicates
          restaurants: {
            $addToSet: {
              _id: '$restaurantDetails._id',
              arabicName: '$restaurantDetails.arabicName',
              englishName: '$restaurantDetails.englishName',
              slug: '$restaurantDetails.slug',
            },
          },
        },
      },
      // cleanup empty objects if matched users aren't following anything
      {
        $project: {
          _id: 0,
          users: 1,
          restaurants: {
            $filter: {
              input: '$restaurants',
              as: 'res',
              cond: { $not: { $eq: ['$$res', {}] } },
            },
          },
        },
      },
    ]);

    return result[0] || { users: [], restaurants: [] };
  }
}
