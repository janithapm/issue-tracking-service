import { Module } from '@nestjs/common';
import { DueDatesController } from './due-dates.controller';
import { DueDatesService } from './due-dates.service';

@Module({
  controllers: [DueDatesController],
  providers: [DueDatesService]
})
export class DueDatesModule {}
