import { Module } from '@nestjs/common';
// import { AppService } from './app.service';
import { DueDatesModule } from './due-dates/due-dates.module';

@Module({
  imports: [DueDatesModule],

  // providers: [AppService],
})
export class AppModule {}
