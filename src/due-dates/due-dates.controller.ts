import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { DueDatesService } from './due-dates.service';
import { StartDateDTO } from './DueDates.dto';

@Controller('due-dates')
export class DueDatesController {

    constructor(private dueDateService: DueDatesService) {

    }

    @Post()
    @UsePipes(ValidationPipe)
    getDueDate(@Body() param: StartDateDTO){
        return this.dueDateService.getDueDate(param);
    }
}
