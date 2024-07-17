import { Body, Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { DueDatesService } from './due-dates.service';
import { StartDateDTO } from './DueDates.dto';

@Controller('dueDate')
export class DueDatesController {

    constructor(private dueDateService: DueDatesService) {

    }

    @Get()
    @UsePipes(ValidationPipe)
    getDueDate(@Body() param: StartDateDTO){
        return this.dueDateService.getDueDate(param);
    }
}
