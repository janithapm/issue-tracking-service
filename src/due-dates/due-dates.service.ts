import { BadRequestException, Injectable } from '@nestjs/common';
import { StartDateDTO } from './DueDates.dto';
import { startHour, endHour } from 'src/utils/constants';

@Injectable()
export class DueDatesService {

    getDueDate(startDateDTO: StartDateDTO) {
        const { startDate, startTime, turnAroundTime } = startDateDTO;
        const workingHours = endHour - startHour;

        let dueDate: Date = new Date(startDate);
        let pendingDates: number = Math.floor(turnAroundTime / workingHours);
        let overFlowHours = turnAroundTime % workingHours;
        const { formattedHours, formattedMinutes } = this._convertTo24HourFormat(startTime);

        if (formattedHours > endHour || formattedHours < startHour) {
            throw new BadRequestException('Outside Working Hours');
        }

        let startTimeInDecimalFormat: number = formattedHours + (formattedMinutes / 60);

        while (overFlowHours > 0 && startTimeInDecimalFormat + overFlowHours > endHour) {
            overFlowHours = startTimeInDecimalFormat + overFlowHours - endHour;
            startTimeInDecimalFormat = startHour;
            pendingDates++;
        }
        startTimeInDecimalFormat += overFlowHours;

        while (pendingDates) {
            dueDate.setDate(dueDate.getDate() + 1);

            const day: number = dueDate.getDay();
            if (![0, 6].includes(day)) {
                pendingDates--;
            }
        }

        return { dueDate: this._convertDateToString(dueDate), dueTime: this._converHoursToTimeFormat(startTimeInDecimalFormat) };

    }

    _convertDateToString(date:Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
    }

    _convertTo24HourFormat(startTime: string) {
        const match = startTime.match(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9]) (?:AM|PM)$/i);

        let hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        const period = startTime.slice(-2).toLocaleLowerCase();

        if (period === 'pm' && hours < 12) {
            hours += 12;
        } else if (period === 'am' && hours === 12) {
            hours = 0;
        }

        const formattedHours = parseInt(hours.toString().padStart(2, '0'));
        const formattedMinutes = parseInt(minutes.toString().padStart(2, '0'));

        return { formattedHours, formattedMinutes };
    }

    _converHoursToTimeFormat(startTime: number) {
        const minutes = (Math.floor(60 * (startTime - Math.floor(startTime)))).toString().padStart(2, '0');
        const hours: number = Math.floor(startTime);
        const hoursString = hours.toString().padStart(2, '0');


        if (hours >= 12) {
            return (hours == 12) ? `${hoursString}:${minutes} PM` : `${(hours - 12).toString().padStart(2, '0')}:${minutes} PM`;
        }

        return `${hoursString}:${minutes} AM`;
    }
}
