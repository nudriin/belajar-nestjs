import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ModulReferenceModule } from './modul-reference/modul-reference.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigureModule } from './configure/configure.module';
import { SharingProviderModule } from './sharing-provider/sharing-provider.module';

@Module({
    imports: [
        // * Meregistraiskan config module
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        // * =============================
        UserModule,
        ModulReferenceModule,
        ConfigModule,
        ConfigureModule,
        SharingProviderModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
