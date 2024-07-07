import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http'; // install mock

describe('UserController', () => {
    let controller: UserController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should can sample response', async () => {
        // cara menggunakan unit testnya cukup panggil controller dan method yang akan di test
        const response = await controller.asyncMethod('Nurdin', 20);
        const data = JSON.parse(response);
        expect(data).toEqual({
            name: 'Nurdin',
            age: 20,
        });
        console.log(data);
    });

    // membuat mock
    it('should support mocks response', () => {
        const response = httpMock.createResponse();

        // Menggunakan mock response pada viewHello
        controller.viewHello('Nurdin', response);

        console.log(response._getRenderData());
        console.log(response._getRenderView());

        expect(response._getRenderView()).toBe('index.html');
        expect(response._getRenderData()).toEqual({
            title: 'View Engine',
            name: 'Nurdin',
        });
    });
});
