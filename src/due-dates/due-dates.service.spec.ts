import { Test, TestingModule } from '@nestjs/testing';
import { DueDatesService } from './due-dates.service';
import { StartDateDTO, StartDate } from './DueDates.dto';
import { BadRequestException } from '@nestjs/common';

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
    expect(service.getDueDate).toBeDefined();
  });

  describe("getDueDate function", () => {

    it('should take StartDateDTO as input and return StartDate', () => {

      const mockStartDate: StartDateDTO = {
        startDate: "2024-07-19",
        startTime: "09:00 AM",
        turnAroundTime: 10
      };

      const expected = {
        dueDate: "2024-07-22",
        dueTime: "10:00 AM",
      };


      const result = service.getDueDate(mockStartDate);

      expect(typeof service.getDueDate).toBe('function');
      expect(result).toEqual(expect.any(Object));
    });

    it('should not return a weekend date', () => {
      const input: StartDateDTO = {
        startDate: "2024-07-19",
        startTime: "09:00 AM",
        turnAroundTime: 10
      };


      const worngOutput = {
        dueDate: "2024-07-20",
        dueTime: "10:00 AM",
      };


      const expectedOutput = {
        dueDate: "2024-07-22",
        dueTime: "10:00 AM",
      }; // Replace with expected output

      const result = service.getDueDate(input);

      expect(result).toEqual(expectedOutput);
      expect(result).not.toEqual(worngOutput); // Assert against unwanted output
    });

    it('should not allow to startTime out of office hours', () => {
      const input: StartDateDTO = {
        startDate: "2024-07-19",
        startTime: "08:00 AM",
        turnAroundTime: 10
      };

      try {
        service.getDueDate(input);
        fail('Expected BadRequestException to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
  });

  it('should not allow to startTime out of office hours', () => {
    const input: StartDateDTO = {
      startDate: "2024-07-20",
      startTime: "08:00 AM",
      turnAroundTime: 10
    };

    try {
      service.getDueDate(input);
      fail('Expected BadRequestException to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
});
  });





});
