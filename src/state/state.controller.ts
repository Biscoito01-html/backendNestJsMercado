import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './entity/state.entity';
import { CreateStateDto } from './dtos/state.dtos';

@Controller('state')
export class StateController {

    constructor(private readonly stateService: StateService) { }

    @Get()
    async getStates(): Promise<StateEntity[]> {
        return await this.stateService.getStates();
    }


    @Post()
    async createState(@Body() createDto: CreateStateDto) {
        return await this.stateService.createState(createDto);
    }

    @Patch(':id')
    async updateState(@Body() updateDto: CreateStateDto, @Body('id') id: number) {
        return await this.stateService.updateState(id, updateDto);
    }

    @Delete(':id')
    async deleteState(@Body('id') id: number) {
        return await this.stateService.deleteState(id);
    }

}
