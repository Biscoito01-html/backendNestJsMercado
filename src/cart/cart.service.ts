import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>
  ) { }

  async create(createCartDto: CreateCartDto) {
    return await this.cartRepository.save(createCartDto);
  }

  async findAll() {
    return await this.cartRepository.find();
  }

  findOne(id: number) {
    return this.cartRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCartDto: UpdateCartDto) {

    const cart = await this.cartRepository.preload({ id, ...updateCartDto });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return this.cartRepository.save(cart);
  }

  remove(id: number) {
    return this.cartRepository.delete(id);
  }
}
