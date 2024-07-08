import { Module } from '@nestjs/common';
import { SharingProviderController } from './sharing-provider.controller';
import { UserService } from 'src/user/user/user.service';

@Module({
    controllers: [SharingProviderController],
    providers: [UserService],
})
export class SharingProviderModule {}
