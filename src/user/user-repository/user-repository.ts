// import { Injectable } from '@nestjs/common';

import { Connection } from '../connection/connection';

// ! FACTORY PROVIDER
// Membuat class yang akan dijadikan providernya
export class UserRepository {
    connection: Connection;

    save(): string {
        return `User save with connection: ${this.connection.getName()}`;
    }
}

// Membuat factory method yang nantinya akan digunakan untuk membuat object providernya
export function createUserRepository(connection: Connection): UserRepository {
    const userRepo = new UserRepository();
    userRepo.connection = connection;
    return userRepo;
}
