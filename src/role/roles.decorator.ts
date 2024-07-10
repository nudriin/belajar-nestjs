import { Reflector } from '@nestjs/core';

// Membuat reflector
export const Roles = Reflector.createDecorator<string[]>();
