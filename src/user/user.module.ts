import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {
    Connection,
    MongoDBConnection,
    MySQLConnection,
} from './connection/connection';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        // Menggunakan class providernya pada User module
        {
            provide: Connection,
            useClass:
                //Jika ENV nya mysql  maka object yang akan dibuat adalah dari class MySQLConnection
                process.env.DATABASE == 'mysql'
                    ? MySQLConnection
                    : MongoDBConnection,
        },
    ],
})
export class UserModule {}
