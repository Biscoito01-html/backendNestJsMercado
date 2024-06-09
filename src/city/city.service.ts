import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entity/city.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dtos/createCity.dto';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
    ) { }

    async getCity(): Promise<CityEntity[]> {
        return this.cityRepository.find();
    }

    async createCity(city: CreateCityDto): Promise<CityEntity> {
        return this.cityRepository.save(city);
    }







}
