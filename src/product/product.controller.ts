import { Body, Controller, Header, Post } from '@nestjs/common';
import { ProductRepository } from './product-repository/product-repository';

@Controller('/api/products')
export class ProductController {
    constructor(private productRepository: ProductRepository) {}
    @Post()
    @Header('Content-Type', 'application/json')
    async add(
        @Body('name') name: string,
        @Body('price') price: number,
    ): Promise<string> {
        const result = await this.productRepository.save(name, price);

        return JSON.stringify(result);
    }
}
