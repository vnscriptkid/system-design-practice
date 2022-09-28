import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { NestFactory } from '@nestjs/core';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { AppModule } from './app.module';
import * as Queue from 'bull';
import * as  expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverAdapter = new ExpressAdapter()
  serverAdapter.setBasePath('/bull')

  const fiboQueue = new Queue('fibonacci');

  createBullBoard({
    queues: [
      new BullAdapter(fiboQueue),
    ],
    serverAdapter,
  })

  app.use(
    '/bull',
    serverAdapter.getRouter()
  )

  await app.listen(3000);
}
bootstrap();
