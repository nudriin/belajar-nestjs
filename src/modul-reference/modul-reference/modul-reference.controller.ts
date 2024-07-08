import { Controller, Get, Header } from '@nestjs/common';
import { MemberService } from '../member/member.service';

@Controller('/api/reference')
export class ModulReferenceController {
    constructor(private memberService: MemberService) {}

    @Get('/member')
    @Header('Content-Type', 'application/json')
    async getConnection(): Promise<string> {
        const data = {
            connection: this.memberService.getConnection(),
            mail: this.memberService.getEmail(),
        };

        return JSON.stringify(data);
    }
}
