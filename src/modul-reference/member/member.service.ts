import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Connection } from 'src/user/connection/connection';
import { MailService } from 'src/user/mail/mail.service';

@Injectable()
export class MemberService {
    // Membuat module refrence menggunakan ModuleRef class
    constructor(private modulRef: ModuleRef) {}

    getConnection(): string {
        // Mengambil dependency yang ada pada modul user menggunakan method get
        const connection = this.modulRef.get(Connection);
        return connection.getName();
    }

    getEmail(): string {
        // mengambil dependency mail service secara manual
        const email = this.modulRef.get(MailService);
        return email.send();
    }
}
