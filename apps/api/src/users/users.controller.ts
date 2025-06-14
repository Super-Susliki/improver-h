import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  RequestUser,
  UserClaims,
} from '../auth/decorators/request-user.decorator';
import { PrivyAuthGuard } from '../auth/guards/privy-auth.guard';

import { UserResponseDto } from './dtos/user-response.dto';
import { UserStoresResponseDto } from './dtos/user-stores-response.dto';
import { UsersService } from './users.service';
import { storesWithHashedId } from 'src/utils/store';

@ApiTags('Users')
@Controller('users')
@UseGuards(PrivyAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'The user profile has been successfully retrieved',
    type: UserResponseDto,
  })
  async getCurrentUser(
    @RequestUser() user: UserClaims,
  ): Promise<UserResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userDb = await this.usersService.findById(user.dbUser!.id);
    return { ...userDb };
  }

  @Get('me/stores')
  @ApiOperation({ summary: 'Get current user stores' })
  @ApiResponse({
    status: 200,
    type: [UserStoresResponseDto],
  })
  async getUserStores(
    @RequestUser() user: UserClaims,
  ): Promise<UserStoresResponseDto[]> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stores = await this.usersService.getUserStores(user.dbUser!.id);
    return storesWithHashedId(stores);
  }
}
