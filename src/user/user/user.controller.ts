import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';

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

    // mengambil request parameter menggunakan object Request dari express
    @Get('/:nurdinId') // path yang dapat menerima request param
    getUserById(@Req() request: Request): string {
        return `GET ${request.params.nurdinId}`;
    }

    // mengambil query parameter menggunakan decorator @Query
    // diakses menggunakan /api/users?name=nurdin
    @Get()
    getUserByUsername(@Query('name') name: string): string {
        return `Hello ${name || 'Guest'}`;
    }

    // Mengambil request param menggunakan @Param
    @Get('/:nurdinId/:email')
    getUserByEmail(
        @Param('email') email: string,
        @Param('nurdinId') id: string,
    ): string {
        return `ID: ${id} <br>Email: ${email}`;
    }
}
