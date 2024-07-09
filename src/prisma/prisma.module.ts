import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// @Global() //! Membuat prisma menjadi global module yang bisa di import dimana saja
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
