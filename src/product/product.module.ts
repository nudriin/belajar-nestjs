import { Module } from '@nestjs/common';
import { ProductRepository } from './product-repository/product-repository';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    providers: [ProductRepository, PrismaService],
    controllers: [ProductController],
})
export class ProductModule {}
