import { Injectable } from '@nestjs/common';
import { StartDateDTO } from './DueDates.dto';

@Injectable()
export class DueDatesService {

    getDueDate(startDateDTO: StartDateDTO) {
        const { startDate, startTime, turnAroundTime } = startDateDTO;

        return startDateDTO;
    }
}
