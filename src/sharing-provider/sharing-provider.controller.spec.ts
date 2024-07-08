import { Test, TestingModule } from '@nestjs/testing';
import { SharingProviderController } from './sharing-provider.controller';

describe('SharingProviderController', () => {
  let controller: SharingProviderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharingProviderController],
    }).compile();

    controller = module.get<SharingProviderController>(SharingProviderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
