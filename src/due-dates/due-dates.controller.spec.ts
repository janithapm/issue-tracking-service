import { Test, TestingModule } from '@nestjs/testing';
import { DueDatesController } from './due-dates.controller';
import { DueDatesService } from './due-dates.service';
import { StartDateDTO } from './DueDates.dto';
import { NotFoundException } from '@nestjs/common';


describe('DueDatesController', () => {
  let controller: DueDatesController;
  let dueDateService: DueDatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DueDatesController],
      providers: [
        {
          provide: DueDatesService,
          useValue: {
            getDueDate: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DueDatesController>(DueDatesController);
    dueDateService = module.get<DueDatesService>(DueDatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have getDueDate functions', () => {
    expect(controller.getDueDate).toBeDefined();
  });

  it('should call dueDateService.getDueDate with valid StartDateDTO', async () => {
    const validStartDate: StartDateDTO = { startDate: '2024-07-16', startTime:"", turnAroundTime:1 }; 
    controller.getDueDate(validStartDate);
    expect(dueDateService.getDueDate).toHaveBeenCalledWith(validStartDate);
  });

  // it('should throw NotFoundException if dueDateService throws', async () => {
  //   const invalidStartDate: StartDateDTO = { startDate: 'invalid-date-format', startTime:"", turnAroundTime:1  }; // Invalid date format
  //   // dueDateService.getDueDate.mockImplementationOnce(() => {
  //   //   throw new NotFoundException('Start date not found');
  //   // });

  //   expect(controller.getDueDate(invalidStartDate)).rejects.toThrow(
  //     NotFoundException,
  //   );
  // });

});
