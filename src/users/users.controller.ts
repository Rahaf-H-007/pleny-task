import { Controller, Get } from '@nestjs/common';

@Controller('/api/users/recommendations')
export class UsersController {
  //dummy data
  @Get()
  getAllUsers() {
    return [
      { id: 1, name: 'ahmed' },
      { id: 2, name: 'mohamed' },
      { id: 3, name: 'ali' },
    ];
  }
}
