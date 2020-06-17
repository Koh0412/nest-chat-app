import { Test, TestingModule } from '@nestjs/testing';
import { BroadcastGateway } from './broadcast.gateway';

describe('BroadcastGateway', () => {
  let gateway: BroadcastGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BroadcastGateway],
    }).compile();

    gateway = module.get<BroadcastGateway>(BroadcastGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
