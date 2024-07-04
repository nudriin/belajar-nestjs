import {
    Controller,
    Get,
    Header,
    HttpCode,
    HttpRedirectResponse,
    Param,
    Post,
    Query,
    Redirect,
    Req,
    Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/api/users') // * membuat path controller nya
export class UserController {
    // ! ASYNCHRONOUS ============================================================================================================
    // cara membuat method async adalah cukup dengan menambah kan ka kunci async pada method
    // dan return nya adalah Promise<T>
    @Get('/async')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    async asyncMethod(
        @Query('name') name: string,
        @Query('age') age: number,
    ): Promise<string> {
        return JSON.stringify({
            name: name,
            age: age,
        });
    }

    // ! RESPONSE ============================================================================================================
    // Membuat response menggunakan express.Response object
    @Get('/sample-res')
    responseExpress(@Res() res: Response) {
        res.status(200).json({
            name: 'Response Lesson',
            date: '2024-01-04',
        });
    }

    @Get('/nest-response')
    @Header('Content-Type', 'application/json') // membuat response headernya
    @HttpCode(200) // mengirimkan status code
    sampleResponse(): Record<string, string> {
        // return response berupa record
        return {
            name: 'Response Lesson',
            date: '2024-01-04',
        };
    }

    @Get('/nest-response-string')
    @Header('Content-Type', 'application/json') // membuat response headernya
    @HttpCode(200) // mengirimkan status code
    sampleResponseString(): string {
        // return response berupa string
        return JSON.stringify({
            name: 'Nest Stringify',
            date: '2024-01-04',
        });
    }

    // membuat redirect response
    @Get('/redirect')
    @Redirect()
    redirect(): HttpRedirectResponse {
        return {
            url: '/api/users/nest-response-string',
            statusCode: 301,
        };
    }

    // ! API ROUTE ============================================================================================================
    @Post() // * karena path nya tidak kita tuliskan maka akan mengikuti path controller
    registerUser(): string {
        return 'POST';
    }

    @Get('/current') // * pathnya akan menjadi /api/users/current
    getUserCurrent(): string {
        return 'GET';
    }

    // ! REQUEST ============================================================================================================
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
