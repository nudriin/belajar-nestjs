import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
// Membuat class prisma service yang nantinya dijadikan provider
export class PrismaService extends PrismaClient {
    constructor() {
        super(); // panggil super constructor
        console.log('Create prisma service');
    }
}
