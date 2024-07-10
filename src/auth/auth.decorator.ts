import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Auth = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest(); // mengambil request
        return request.user; // mengambil dan mengirim request user nya
    },
);
