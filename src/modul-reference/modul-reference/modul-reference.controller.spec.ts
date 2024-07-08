import { Test, TestingModule } from '@nestjs/testing';
import { ModulReferenceController } from './modul-reference.controller';

describe('ModulReferenceController', () => {
  let controller: ModulReferenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModulReferenceController],
    }).compile();

    controller = module.get<ModulReferenceController>(ModulReferenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
