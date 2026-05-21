import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserRestaurant, UserRestaurantSchema } from './userRestaurant.schema';

@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: UserRestaurant.name, schema: UserRestaurantSchema },
    ]),
  ],
})
export class UsersModule {}
