import { Test, TestingModule } from '@nestjs/testing';
import { Configure } from './configure';

describe('Configure', () => {
  let provider: Configure;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Configure],
    }).compile();

    provider = module.get<Configure>(Configure);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
