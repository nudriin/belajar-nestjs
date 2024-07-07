import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return name and age as a JSON', () => {
        const response = service.getNameAndAge('Nurdin', 20);
        console.log(response);
        expect(JSON.parse(response)).toEqual({
            name: 'Nurdin',
            age: 20,
        });
    });
});
