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

    it('should return the correct output', () => {
      const input: StartDateDTO = {
        startDate: "2024-07-15",
        startTime: "09:00 AM",
        turnAroundTime: 10.5
      };

      const expectedOutput = {
        dueDate: "2024-07-16",
        dueTime: "11:30 AM"
    }

      const result = service.getDueDate(input);

      expect(result).toEqual(expectedOutput);
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
        dueTime: "11:00 AM",
      };

      const result = service.getDueDate(input);

      expect(result).toEqual(expectedOutput);
      expect(result).not.toEqual(worngOutput);
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
        startTime: "19:00 PM",
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


  describe(" _converHoursToTimeFormat function", ()=> {
    it('should handle midnight', () => {
      expect(service._converHoursToTimeFormat(0)).toBe('00:00 AM');
    });
  
    it('should handle early morning', () => {
      expect(service._converHoursToTimeFormat(5.25)).toBe('05:15 AM');
    });
  
    it('should handle noon', () => {
      expect(service._converHoursToTimeFormat(12)).toBe('12:00 PM');
    });
  
    it('should handle afternoon', () => {
      expect(service._converHoursToTimeFormat(14.75)).toBe('02:45 PM');
    });
  
    it('should handle late afternoon', () => {
      expect(service._converHoursToTimeFormat(17)).toBe('05:00 PM');
    });
  
    it('should handle evening', () => {
      expect(service._converHoursToTimeFormat(20.33)).toBe('08:19 PM');
    });
  
    it('should handle just before midnight', () => {
      expect(service._converHoursToTimeFormat(23.59)).toBe('11:35 PM');
    });

    it('should handle minutes greater than 59', () => {
      expect(service._converHoursToTimeFormat(12.99)).toBe('12:59 PM');
    });
  });





});
