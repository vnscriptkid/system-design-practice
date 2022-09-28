import { Test, TestingModule } from '@nestjs/testing';
import { FibonacciService } from './fibonacci.service';

describe('FibonacciService', () => {
  let service: FibonacciService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FibonacciService],
    }).compile();

    service = module.get<FibonacciService>(FibonacciService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
