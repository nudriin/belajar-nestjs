import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ModulReferenceModule } from './modul-reference/modul-reference.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigureModule } from './configure/configure.module';
import { SharingProviderModule } from './sharing-provider/sharing-provider.module';
import { PrismaModule } from './prisma/prisma.module';
import { WinstonModule } from 'nest-winston';
import { ProductModule } from './product/product.module';
import { ValidationModule } from './validation/validation.module';
import * as winston from 'winston'; // import winstonnya
import { LogMiddleware } from './log/log.middleware';
import { AuthMiddleware } from './auth/auth.middleware';
// import { UserController } from './user/user/user.controller';
// import { ProductController } from './product/product.controller';
// import { SharingProviderController } from './sharing-provider/sharing-provider.controller';

@Module({
    imports: [
        // * Meregistraiskan Validation module
        ValidationModule.forRoot(true),
        // * Meregistraiskan config module
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        // * =============================
        // * Meregistraiskan winston module
        WinstonModule.forRoot({
            format: winston.format.json(),
            level: 'debug',
            transports: [new winston.transports.Console()],
        }),
        // * =============================
        UserModule,
        ModulReferenceModule,
        ConfigModule,
        ConfigureModule,
        SharingProviderModule,
        PrismaModule,
        ProductModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
// ! Meregiskan middleware menggunakan nest module
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LogMiddleware).forRoutes({
            path: '/api/*', // semua yang diawali dengan api akan implementasi middleware ini
            method: RequestMethod.ALL, // semua request method akan implementasi
        });

        // ! Menambahkan AuthMiddleware
        consumer.apply(AuthMiddleware).forRoutes({
            path: '/api/users/current',
            method: RequestMethod.GET,
        });

        // ! Bisa juga seperi dibawah ini
        // consumer
        //     .apply(LogMiddleware)
        //     .forRoutes(
        //         UserController,
        //         ProductController,
        //         SharingProviderController,
        //     );
    }
}
