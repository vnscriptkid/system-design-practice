import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    ThrottlerModule.forRoot({
      limit: 3 /* requests */,
      ttl: 20 /* seconds */
    }),
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
