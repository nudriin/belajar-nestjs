import { Injectable } from '@nestjs/common';
// import { UserRepo } from '../user-repo/user-repo';
// import { User } from '@prisma/client';

@Injectable()
export class UserService {
    // constructor(private userRepo: UserRepo) {}

    getNameAndAge(name: string, age: number): string {
        return JSON.stringify({
            name: name,
            age: age,
        });
    }

    // async saveUser(name: string, age: number): Promise<User> {
    //     const result = await this.userRepo.save(name, age);

    //     return result;
    // }
}
