import { Module } from '@nestjs/common';
import { ConfigureController } from './configure/configure.controller';
import { Configure, createConnection } from './configure/configure';
import { ConfigService } from '@nestjs/config';

@Module({
    controllers: [ConfigureController],
    providers: [
        // menggunakan class confignya
        {
            provide: Configure,
            useFactory: createConnection,
            inject: [ConfigService],
        },
    ],
})
export class ConfigureModule {}
