import { z } from 'zod';

export class LoginRequest {
    username: string;
    password: string;
}

export const loginRequestValidation = z.object({
    username: z.string().email(),
    password: z.string().min(3).max(100),
});
