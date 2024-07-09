import { DynamicModule, Module } from '@nestjs/common';
import { ValidationService } from './validation.service';

// Membuat modulenya menjadi dynamic module
@Module({})
export class ValidationModule {
    static forRoot(isGlobal: boolean): DynamicModule {
        return {
            module: ValidationModule,
            global: isGlobal,
            providers: [ValidationService],
            exports: [ValidationService],
        };
    }
}
