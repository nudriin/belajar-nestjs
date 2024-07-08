import { Test, TestingModule } from '@nestjs/testing';
import { ConfigureController } from './configure.controller';

describe('ConfigureController', () => {
  let controller: ConfigureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigureController],
    }).compile();

    controller = module.get<ConfigureController>(ConfigureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
