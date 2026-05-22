import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/api/users/recommendations')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  @ApiOperation({
    summary:
      'get other users who follow same restaurants as userId and get restaurants details',
  })
  @ApiResponse({
    status: 200,
    description: 'users and restaurants fetched successfully',
  })
  getUsersRestaurants(@Param('userId') userId: string) {
    return this.usersService.getFollows(userId);
  }
}
