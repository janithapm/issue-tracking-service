
import { validateSync } from 'class-validator';
import { StartDateDTO } from './DueDates.dto'; // Replace with your DTO path

describe('StartDateDTO', () => {
  it('should validate a valid StartDateDTO object', () => {
    const validDto: StartDateDTO = {
      startDate: '2024-07-16', // Valid date format
      startTime: '10:30 am', // Valid time format
      turnAroundTime: 120, // Non-negative number
    };
    const validationErrors = validate(validDto);
    expect(validationErrors).toHaveLength(1); // No validation errors
  });

  it('should throw validation errors for an invalid startDate', () => {
    const invalidDto: StartDateDTO = {
      startDate: 'invalid-date', // Invalid format
      startTime: '10:30 AM',
      turnAroundTime: 120,
    };

    const validationErrors = validate(invalidDto);
    expect(validationErrors).toHaveLength(1); // One validation error

    const error = validationErrors[0];
    expect(error.constraints.unknownValue).toBeDefined(); // Matches constraint violated
  });

  it('should throw validation errors for an invalid startTime', () => {
    const invalidDto: StartDateDTO = {
      startDate: '2024-07-16',
      startTime: 'invalid-time', // Invalid format
      turnAroundTime: 120,
    };

    const validationErrors = validate(invalidDto);
    expect(validationErrors).toHaveLength(1); // One validation error

    const error = validationErrors[0];
    expect(error.constraints.unknownValue).toBeDefined(); // Matches constraint violated
  });

  it('should throw a validation error for a negative turnAroundTime', () => {
    const invalidDto: StartDateDTO = {
      startDate: '2024-07-16',
      startTime: '10:30 AM',
      turnAroundTime: -10, // Negative value
    };

    const validationErrors = validate(invalidDto);
    expect(validationErrors).toHaveLength(1); // One validation error

    const error = validationErrors[0];
    expect(error.constraints.unknownValue).toBeDefined(); // Matches constraint violated
  });
});

// Helper function to use class-validator's validateSync
function validate(dto: StartDateDTO): any[] {
  return validateSync(dto, { skipMissingProperties: false });
}