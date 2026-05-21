import { Controller, Get } from '@nestjs/common';

@Controller()
export class UsersController {
  @Get('/api/users')
  getAllUsers() {
    return [
      { id: 1, name: 'ahmed' },
      { id: 2, name: 'mohamed' },
      { id: 3, name: 'ali' },
    ];
  }
}
