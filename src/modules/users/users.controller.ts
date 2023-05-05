import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiSecurity,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard, SuperAdminGuard } from '../../guards';

import { UsersService } from './users.service';
import { User } from './users.model';
import { UpdateUserDto } from './dto';

@ApiSecurity('super-admin')
@ApiBearerAuth()
@ApiTags('Users route')
@UseGuards(JwtAuthGuard)
@UseGuards(SuperAdminGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/:id')
  getAllUsersqwe(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Update user by Id' })
  @ApiResponse({ status: 200, type: User })
  @Patch('/:id')
  updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, updateUserDto);
  }
}
