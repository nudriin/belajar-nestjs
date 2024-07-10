import {
    Body,
    Controller,
    Get,
    Header,
    HttpCode,
    HttpRedirectResponse,
    Inject,
    Param,
    Post,
    Query,
    Redirect,
    Req,
    Res,
    UseFilters,
    UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { UserRepo } from '../user-repo/user-repo';
import { ValidationFilter } from 'src/validation/validation.filter';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { LoginRequest, loginRequestValidation } from 'src/model/login.model';
import { TimeInterceptor } from '../../time/time.interceptor';

@Controller('/api/users') // * membuat path controller nya
export class UserController {
    // Memanggil user service
    // cukup menggunakan constructor ini saja user service akan dapat langsung dipanggil
    // dan objectnya akan dibuatkan otomatis oleh nest js
    // dapat diakses dengan kata kunci this.service

    // @Inject() // menggunakan inject untuk dependencies inejction melalui properties
    // @Optional() // provider ini dianggap optional, jadi jika providernya tidak tersedia maka tidak error
    // private service: UserService; // memanggil
    constructor(
        private service: UserService,
        private connection: Connection,
        private mailService: MailService,
        @Inject('EmailService') private emailService: MailService, // menggunakan alias provider
        private userRepository: UserRepository,
        private userRepo: UserRepo,
    ) {} // * <---- REKOMENDASINYAA

    // ! INTERCEPTOR
    @Get('/interceptor')
    @Header('Content-Type', 'application/json')
    @UseInterceptors(TimeInterceptor)
    withInterceptor(@Query('name') name: string): Record<string, any> {
        // Response yang kita kirim hanyalah name
        // Tetapi karena kita menggunakan interceptor Time
        // maka ada ada prorty timestamp di response
        return {
            name: name,
        };
    }

    // ! CUSTOM PIPE
    @Post('/login')
    @Header('Content-Type', 'application/json')
    @UseFilters(ValidationFilter)
    // @UsePipes(new ValidationPipe(loginRequestValidation)) //! <== BISA JUGA BEGINI
    login(
        // meregiskan pipenya menggunakan ValidationPipe
        @Body(new ValidationPipe(loginRequestValidation)) request: LoginRequest,
    ): string {
        return JSON.stringify(request);
    }

    // ! DATABASE PRISMA
    @Post()
    @Header('Content-Type', 'application/json')
    async registerUser(
        @Body('name') name: string,
        @Body('age') age: number,
    ): Promise<string> {
        // const result = await this.service.saveUser(name, age);
        const result = await this.userRepo.save(name, age);
        return JSON.stringify(result);
    }

    @Get('/by-name/:name')
    @Header('Content-Type', 'application/json')
    async getUserByName(@Param('name') name: string): Promise<string> {
        // const result = await this.service.saveUser(name, age);
        const result = await this.userRepo.findByName(name);
        return JSON.stringify(result);
    }

    @Get('/all')
    @Header('Content-Type', 'application/json')
    async getAllUser(): Promise<string> {
        // const result = await this.service.saveUser(name, age);
        const result = await this.userRepo.findAll();
        return JSON.stringify(result);
    }

    // ! PROVIDER(DEPENDENCIES INJECTABLE) ================================================================
    @Get('/with-alias-provider')
    @HttpCode(200)
    aliasProvider(): string {
        // memanggil value providernya
        return this.emailService.send();
    }

    @Get('/with-factory-provider')
    @HttpCode(200)
    factoryProvider(): string {
        // memanggil value providernya
        return this.userRepository.save();
    }

    @Get('/with-value-provider')
    @HttpCode(200)
    valueProvider(): string {
        // memanggil value providernya
        return this.mailService.send();
    }

    @Get('/with-class-provider')
    @HttpCode(200)
    connectionProvider(): string {
        // memanggil class providernya
        return this.connection.getName();
    }

    @Get('/with-provider')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    async withService(
        @Query('name') name: string,
        @Query('age') age: number,
    ): Promise<string> {
        // memanggil servicenya
        return this.service.getNameAndAge(name, age);
    }

    // ! VIEWS ==============================================================================================================
    @Get('/view/hello')
    viewHello(@Query('name') name: string, @Res() response: Response) {
        // Merender templatenya
        response.render('index.html', {
            title: 'View Engine',
            name: name,
        });
    }

    // ! COOKIE ============================================================================================================
    @Get('/set-cookie')
    @Header('Content-Type', 'application/json')
    // cookie diambil dari query parameter
    setCookie(@Query('value') value: string, @Res() response: Response) {
        if (value) {
            response.cookie('cook', value); // cookie di set
            response.status(200).json({
                message: 'Set cookie success',
            }); // kemudian datanya pesan suksesnya di return ke response
        } else {
            response.status(400).json({
                errors: 'Value is required',
            });
        }
    }

    @Get('get-cookie')
    getCookie(@Req() request: Request): string {
        return request.cookies['cook']; // mengirimkan kembali request cookienya
    }

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
    @Post('/add') // * karena path nya tidak kita tuliskan maka akan mengikuti path controller
    postTest(): string {
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
