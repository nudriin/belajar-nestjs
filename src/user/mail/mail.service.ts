// import { Injectable } from '@nestjs/common';

// ! VALUE PROVIDER
// Injectable kita hapus
export class MailService {
    send(): string {
        return 'Success send mail';
    }
}

export const mailService: MailService = new MailService();
