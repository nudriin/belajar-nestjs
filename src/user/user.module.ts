import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {
    Connection,
    MongoDBConnection,
    MySQLConnection,
} from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import {
    createUserRepository,
    UserRepository,
} from './user-repository/user-repository';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        // ! Menggunakan class providernya pada User module
        {
            provide: Connection,
            useClass:
                //Jika ENV nya mysql  maka object yang akan dibuat adalah dari class MySQLConnection
                process.env.DATABASE == 'mysql'
                    ? MySQLConnection
                    : MongoDBConnection,
        },
        // ! Menggunakan value provider pada module
        {
            provide: MailService,
            useValue: mailService, // yang akan digunakan adalah object ini
        },
        // ! Menggunakan factory provider
        {
            provide: UserRepository,
            useFactory: createUserRepository, // factory method yang digunakan untuk membuat object providernya
            inject: [Connection], // meng inject Connection ke UserRepository yang dibutuhkan pada factory method
        },
        // ! menggunakan alias provider
        {
            provide: 'EmailService', // membuat nama alias provider
            useExisting: MailService, // menggunakan object provider yang sama dengan MailService tapi namanya berbeda
        },
    ],
    // Kita akan mengeksport provider (Sharing provider)
    exports: [UserService], // user service akan kita export, dan dapat di gunakan oleh modul lainnya
})
export class UserModule {}
