import { IsDateString, IsNotEmpty, IsNumber, IsString, Matches, Min } from "class-validator"

export class StartDateDTO {

    @IsNotEmpty() @IsDateString() @IsString()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, { message: 'Allowed date formats: (YYYY-MM-DD) or (YYYY/MM/DD)' })
    startDate: string

    @IsNotEmpty() @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(?: (?:am|pm))?$/i, { message: 'Invalid time format (HH:MM (am/pm)?)' })
    startTime: string

    @IsNotEmpty() @IsNumber() @Min(0)
    turnAroundTime: number
}

export interface StartDate {
    start: Date,
    turnAroundTime: number
}