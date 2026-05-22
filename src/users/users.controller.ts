import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/users/recommendations')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  getUsersRestaurants(@Param('userId') userId: string) {
    return this.usersService.getFollows(userId);
  }
}
