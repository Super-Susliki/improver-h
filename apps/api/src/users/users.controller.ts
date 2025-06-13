import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserResponseDto } from './dtos/user-response.dto';
import { UsersService } from './users.service';

import {
  RequestUser,
  UserClaims,
} from '../auth/decorators/request-user.decorator';
import { PrivyAuthGuard } from '../auth/guards/privy-auth.guard';

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
    const userDb = await this.usersService.findById(user.dbUser!.id);
    return { ...userDb };
  }

  @Get('wallet/:walletAddress')
  @ApiOperation({ summary: 'Get user by wallet address' })
  @ApiParam({
    name: 'walletAddress',
    description: 'The wallet address of the user',
  })
  @ApiResponse({
    status: 200,
    description: 'The user profile has been successfully retrieved',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUserByWalletAddress(
    @Param('walletAddress') walletAddress: string,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findByWalletAddress(walletAddress);
    return { ...user };
  }
}
