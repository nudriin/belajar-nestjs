import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma/prisma.service';
import { Logger } from 'winston'; // import logger dari winston

@Injectable()
export class ProductRepository {
    constructor(
        private prisma: PrismaService,
        // ! Menggunakan loggernya
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    ) {
        this.logger.info('Succes create product repository');
    }

    async save(name: string, price: number): Promise<Product> {
        const result = await this.prisma.product.create({
            data: {
                name: name,
                price: price,
            },
            select: {
                id: true,
                name: true,
                price: true,
            },
        });

        this.logger.info(`Success create products ${name} with price ${price}`);
        return result;
    }
}
