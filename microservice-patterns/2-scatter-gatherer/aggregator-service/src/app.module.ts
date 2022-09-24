import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeltaServiceClient } from './clients/delta.client';
import { FrontierServiceClient } from './clients/frontier.client';
import { JetblueServiceClient } from './clients/jetblue.client';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, DeltaServiceClient, FrontierServiceClient, JetblueServiceClient],
})
export class AppModule { }
