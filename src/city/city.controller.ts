import { Body, Controller, Get, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './entity/city.entity';
import { CreateCityDto } from './dtos/createCity.dto';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) { }

    @Get()
    async getCity(): Promise<CityEntity[]> {
        return this.cityService.getCity();
    }

    @Post()
    async createCity(@Body() createDto: CreateCityDto): Promise<CityEntity> {
        return this.cityService.createCity(createDto);
    }


}
