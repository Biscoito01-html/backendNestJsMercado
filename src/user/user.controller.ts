import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() createUser: CreateUserDto) {
        return this.userService.createUser(createUser);
    }

    @Get()
    async getUsers(): Promise<UserEntity[]> {
        return this.userService.getUsers();
    }

    @Delete(":id")
    async deleteUsers(@Param('id') id: string): Promise<void> {
        await this.userService.deleteUsers(+id);
    }

    @Patch(":id")
    async updateUser(@Param('id') id: string, @Body() updateUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.updateUser(+id, updateUser);
    }

}
