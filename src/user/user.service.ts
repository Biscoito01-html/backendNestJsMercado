import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
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


}
