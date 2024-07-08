import { Module } from '@nestjs/common';
import { ModulReferenceController } from './modul-reference/modul-reference.controller';
import { MemberService } from './member/member.service';
import {
    Connection,
    MongoDBConnection,
    MySQLConnection,
} from 'src/user/connection/connection';
import { mailService, MailService } from 'src/user/mail/mail.service';

@Module({
    controllers: [ModulReferenceController],
    providers: [
        MemberService,
        // Import provider connection yang akan digunakan di service
        {
            provide: Connection,
            useClass:
                process.env.DATABASE == 'mysql'
                    ? MySQLConnection
                    : MongoDBConnection,
        },
        // Import provider mailservice yang akan digunakan di service
        {
            provide: MailService,
            useValue: mailService,
        },
    ],
})
export class ModulReferenceModule {}
