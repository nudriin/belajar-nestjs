import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as mustache from 'mustache-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cookieParser('Secret')); // menambah cookie parser dengan secret key

    // ! ===== setup view engine =====
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'html');
    app.engine('html', mustache());
    // ! ===== setup view engine =====

    await app.listen(3000);
}
bootstrap();
