import {
    Body,
    Controller,
    Get,
    Header,
    HttpException,
    Param,
    ParseFloatPipe,
    ParseIntPipe,
    Post,
    UseFilters,
} from '@nestjs/common';
import { ProductRepository } from './product-repository/product-repository';
import { z } from 'zod';
import { ValidationService } from 'src/validation/validation.service';
import { ValidationFilter } from 'src/validation/validation.filter';

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
        // ! membuat exception dengan class HttpException
        if (!name) {
            // paramater 1 bisa string atau json
            // 2 = status code
            throw new HttpException(
                {
                    code: 400,
                    errors: 'Name is required',
                },
                400,
            );
        }
        const result = await this.productRepository.save(name, price);

        return JSON.stringify(result);
    }

    @Get('/:id')
    @Header('Content-Type', 'application/json')
    @UseFilters(ValidationFilter) // ! menggunakan validation filter untuk errornya
    async getById(
        // Kita gunakan pipe pada param id nya
        // bisa juga multiple pipe
        @Param('id', ParseIntPipe, ParseFloatPipe) id: number,
    ): Promise<string> {
        // ATAU bisa gunakan coerce untuk parsing datanya
        const schema = z.coerce.number();
        const result = this.validationService.validate(schema, id);

        return `Schema is valid as with value ${result}`;
    }
}
