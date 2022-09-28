import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios'
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { BullModule } from '@nestjs/bull';
import { FibonacciModule } from './fibonacci/fibonacci.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      limit: 3 /* requests */,
      ttl: 20 /* seconds */
    }),
    HttpModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.string().required(),
      })
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.getOrThrow('REDIS_HOST'),
          port: Number(configService.getOrThrow('REDIS_PORT'))
        }
      }),
      inject: [ConfigService]
    }),
    FibonacciModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
