import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ModulReferenceModule } from './modul-reference/modul-reference.module';

@Module({
    imports: [UserModule, ModulReferenceModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
