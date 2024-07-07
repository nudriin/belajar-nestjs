import { Injectable } from '@nestjs/common';

// ! CLASS PROVIDER
@Injectable()
// Buat class interfacenya
export class Connection {
    getName(): string {
        return null;
    }
}

// Class implementasinya
@Injectable()
export class MySQLConnection extends Connection {
    getName(): string {
        return 'MySQl';
    }
}

// class implementasinya
@Injectable()
export class MongoDBConnection extends Connection {
    getName(): string {
        return 'Mongo DB';
    }
}
