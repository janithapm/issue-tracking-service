import { Test, TestingModule } from '@nestjs/testing';
import { DueDatesController } from './due-dates.controller';

describe('DueDatesController', () => {
  let controller: DueDatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DueDatesController],
    }).compile();

    controller = module.get<DueDatesController>(DueDatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
