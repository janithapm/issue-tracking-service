import { Test, TestingModule } from '@nestjs/testing';
import { DueDatesService } from './due-dates.service';

describe('DueDatesService', () => {
  let service: DueDatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DueDatesService],
    }).compile();

    service = module.get<DueDatesService>(DueDatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
