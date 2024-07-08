import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Configure {
    getName(): string {
        return null;
    }
}

@Injectable()
export class MySQLConfigure extends Configure {
    getName(): string {
        return 'MySQL';
    }
}

@Injectable()
export class MongoDBConfigure extends Configure {
    getName(): string {
        return 'MONGO DB';
    }
}

// gunakan ConfigService untuk mengakses .env file, dan mengakses config
// parameter di isi menggunakan inject pada module dan di isi oleh class ConfigService
export const createConnection = (configService: ConfigService): Configure => {
    const db = configService.get('DATABASE'); // mengambil key DATABASE yang ada di .env

    if (db == 'mysql') {
        return new MySQLConfigure();
    } else {
        return new MongoDBConfigure();
    }
};
