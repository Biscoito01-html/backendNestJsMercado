import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Repository } from 'typeorm';
import { ProdutoEntity } from './entities/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly usersRepository: Repository<ProdutoEntity>,
  ) { }

  create(createProdutoDto: CreateProdutoDto) {
    try {

      return this.usersRepository.save(createProdutoDto);

    } catch (error) {

      throw new InternalServerErrorException('Error creating user');

    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const produtoAtual = await this.usersRepository.findOne({ where: { id } });

    if (!produtoAtual) {
      throw new NotFoundException('Product not found');
    }

    const novaQuantidade = produtoAtual.quantity - updateProdutoDto.quantity;

    produtoAtual.quantity = novaQuantidade;

    return this.usersRepository.save(produtoAtual);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
