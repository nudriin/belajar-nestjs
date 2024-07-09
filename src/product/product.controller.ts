import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { ProductRepository } from './product-repository/product-repository';
import { z } from 'zod';
import { ValidationService } from 'src/validation/validation.service';

@Controller('/api/products')
export class ProductController {
    constructor(
        private productRepository: ProductRepository,
        private validationService: ValidationService,
    ) {}
    @Post()
    @Header('Content-Type', 'application/json')
    async add(
        @Body('name') name: string,
        @Body('price') price: number,
    ): Promise<string> {
        const result = await this.productRepository.save(name, price);

        return JSON.stringify(result);
    }

    @Get('/:id')
    @Header('Content-Type', 'application/json')
    async getById(@Param('id') id: number): Promise<string> {
        // Kita parse, karena pada
        if (typeof id == 'string') {
            id = parseInt(id);
        }

        // ATAU bisa gunakan coerce
        const schema = z.coerce.number();
        const result = this.validationService.validate(schema, id);

        return `Schema is valid as with value ${result}`;
    }
}
