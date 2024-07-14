import { Controller, Get, Query } from '@nestjs/common';
import { DueDatesService } from './due-dates.service';
import { StartDateDTO } from './DueDates.dto';

@Controller('due-dates')
export class DueDatesController {

    constructor(private dueDateService: DueDatesService) {

    }

    @Get()
    getDueDate(@Query() param: StartDateDTO){
        return this.dueDateService.getDueDate(param);
    }
}
