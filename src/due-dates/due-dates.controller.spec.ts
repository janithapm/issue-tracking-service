import { Test, TestingModule } from '@nestjs/testing';
import { DueDatesController } from './due-dates.controller';
import { DueDatesService } from './due-dates.service';


describe('DueDatesController', () => {
  let controller: DueDatesController;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DueDatesController],
      providers: [
        {
          provide: DueDatesService,
          useValue: {
            getDueDate: jest.fn().mockReturnValue('Mocked Due Date'), // Mock a method
          },
        },
      ],
    }).compile();

    controller = module.get<DueDatesController>(DueDatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
