import { Controller, Get, Header } from '@nestjs/common';
import { Configure } from './configure';

@Controller('/api/configure')
export class ConfigureController {
    constructor(private configure: Configure) {}

    @Get('/get-connect')
    @Header('Content-Type', 'application/json')
    async getConnect(): Promise<string> {
        return JSON.stringify({
            connection: this.configure.getName(),
        });
    }
}
