import { Controller, Get, Header } from '@nestjs/common';
import { UserService } from 'src/user/user/user.service';

@Controller('/api/sharing')
export class SharingProviderController {
    // menggunakan provider userService yang sudah di eksport
    // userService dapat digunakan di module dan controller ini
    constructor(private userService: UserService) {}

    @Get('/users')
    @Header('Content-Type', 'application/json')
    async getUser(): Promise<string> {
        return this.userService.getNameAndAge('Nurdin', 20);
    }
}
