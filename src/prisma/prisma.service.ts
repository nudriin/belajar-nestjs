import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
// Membuat class prisma service yang nantinya dijadikan provider
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        super(); // panggil super constructor
        console.log('Create prisma service');
    }
    // Ketika prisma di init maka akan di panggil function inid
    onModuleInit() {
        console.log('Connect Prisma');
        this.$connect();
    }

    // Ketika prisma di destroy maka akan di eksekusi method berikut
    onModuleDestroy() {
        console.log('Connect Prisma');
        this.$disconnect();
    }
}
