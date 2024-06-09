import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from './entity/state.entity';
import { Repository } from 'typeorm';
import { CreateStateDto } from './dtos/state.dtos';

@Injectable()
export class StateService {

    constructor(
        @InjectRepository(StateEntity)
        private readonly stateRepository: Repository<StateEntity>,
    ) { }

    async getStates(): Promise<StateEntity[]> {
        return await this.stateRepository.find();
    }
    async createState(createDto: CreateStateDto): Promise<StateEntity> {
        return await this.stateRepository.save(createDto);
    }
    async updateState(id: number, updateDto: CreateStateDto): Promise<StateEntity> {
        const state = await this.stateRepository.preload({ id, ...updateDto });
        if (!state) {
            throw new Error('State not found');
        }
        return await this.stateRepository.save(state);
    }
    async deleteState(id: number): Promise<void> {
        await this.stateRepository.delete(id);
    }
}
