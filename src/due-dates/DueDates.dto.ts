import { IsDateString, IsNotEmpty, Min } from "class-validator"

export class StartDateDTO {
    @IsNotEmpty()
    @IsDateString()
    startDate: string
    @IsNotEmpty()
    startTime: string
    @IsNotEmpty()
    @Min(0)
    turnAroundTime: Number
}

export interface StartDate {
    start: Date,
    turnAroundTime: Number
}