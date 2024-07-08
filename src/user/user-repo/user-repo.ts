import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepo {
    constructor(private prismaService: PrismaService) {
        console.log('create user repository');
    }

    async save(name: string, age: number) {
        const result = await this.prismaService.user.create({
            data: {
                name: name,
                age: age,
            },
            select: {
                id: true,
                name: true,
                age: true,
            },
        });

        return result;
    }

    async findByName(name: string): Promise<Array<User>> {
        const result = await this.prismaService.user.findMany({
            select: {
                id: true,
                name: true,
                age: true,
            },
            where: {
                name: name,
            },
        });

        return result;
    }

    async findAll(): Promise<Array<User>> {
        const result = await this.prismaService.user.findMany({
            select: {
                id: true,
                name: true,
                age: true,
            },
        });

        return result;
    }
}
