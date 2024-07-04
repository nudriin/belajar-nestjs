/* eslint-disable prettier/prettier */
import { Controller, Get, Post } from '@nestjs/common';

@Controller('/api/users') // * membuat path controller nya
export class UserController {
    @Post() // * karena path nya tidak kita tuliskan maka akan mengikuti path controller
    registerUser(): string {
        return 'POST';
    }

    @Get('/current') // * pathnya akan menjadi /api/users/current
    getUserCurrent(): string {
        return 'GET';
    }
}
