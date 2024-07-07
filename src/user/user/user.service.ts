import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    getNameAndAge(name: string, age: number): string {
        return JSON.stringify({
            name: name,
            age: age,
        });
    }
}
