import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from 'src/core/entity/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { UserRoles } from 'src/common/database/Enums';
import { Protected } from 'src/common/decorator/protected.decorator';
import { Roles } from 'src/api/auth/roles/RolesDecorator';

@ApiTags('Users') // API guruhini belgilash
@Controller('users')
@ApiBearerAuth('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @Protected(true)
  @Roles([UserRoles.ADMIN, UserRoles.USER])
  @ApiOperation({ summary: 'Create a user' }) // Amal haqida ma'lumot
  @ApiResponse({ status: 201, description: 'User created successfully', type: CreateUserDto }) // Muvaffaqiyatli yaratilgan foydalanuvchi haqida ma'lumot
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Protected(true)
  @Roles([UserRoles.ADMIN, UserRoles.USER])
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users', type: [CreateUserDto] })
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Return a user', type: CreateUserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: CreateUserDto })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
