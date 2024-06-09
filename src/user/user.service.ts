import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) { }
    async getUsers(): Promise<UserEntity[]> {
        try {
            return await this.usersRepository.find();
        } catch (error) {
            throw new InternalServerErrorException('Error fetching users');
        }
    }
    async updateUser(id: number, updateUser: CreateUserDto): Promise<UserEntity> {
        const user = await this.usersRepository.preload({ id, ...updateUser });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return await this.usersRepository.save(user);
    }

    async createUser(createUser: CreateUserDto): Promise<UserEntity> {
        const { password, ...rest } = createUser;


        if (!password) {
            throw new BadRequestException('Password is required');
        }

        const hashedPassword = await this.hashPassword(password);
        const user = this.usersRepository.create({
            ...rest,
            password: hashedPassword,
        });

        try {
            return await this.usersRepository.save(user);
        } catch (error) {
            throw new InternalServerErrorException('Error creating user');
        }
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    async deleteUsers(id: number) {
        try {
            const user = await this.usersRepository.findOne({ where: { id } });
            if (!user) {
                throw new NotFoundException('User not found');
            }
            await this.usersRepository.remove(user);
            return { message: 'User successfully deleted' };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error deleting user');
        }
    }


}
