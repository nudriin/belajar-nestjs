import { Module } from '@nestjs/common';
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
import * as winston from 'winston'; // import winstonnya

@Module({
    imports: [
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
export class AppModule {}
