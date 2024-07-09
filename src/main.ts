import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as mustache from 'mustache-express';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationFilter } from './validation/validation.filter';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const logger = app.get(WINSTON_MODULE_NEST_PROVIDER); // mengambil winston provider nya
    app.useLogger(logger); // menggunakan logger

    app.use(cookieParser('Secret')); // menambah cookie parser dengan secret key

    // ! ===== setup view engine =====
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'html');
    app.engine('html', mustache());
    // ! ===== setup view engine =====

    // ! Menjadikan ValidationFilter sebagai global yang akan digunakan di semua controller
    app.useGlobalFilters(new ValidationFilter());

    // ! ===== Mengambil ConfigService menggunakan app ====
    const configService = app.get(ConfigService);
    // Menggunakan port yang ada di .env file pada listen app
    await app.listen(configService.get('PORT'));
}
bootstrap();
