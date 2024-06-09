import { IsNumber, IsString } from "class-validator";


export class CreateProdutoDto {
    @IsString()
    description: string

    @IsString()
    codeBar: string

    @IsString()
    name: string

    @IsNumber()
    price: number

    @IsNumber()
    quantity: number

    @IsNumber()
    peso: number

    @IsString()
    unidadeMedida: string

}
