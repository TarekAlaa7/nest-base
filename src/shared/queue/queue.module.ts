// src/shared/queue/queue.module.ts

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { ProcessorService } from './processor.service';
import { QUEUE_NAME } from '../constants/queue.constants';
import { queueConfig } from 'src/config/queue.config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAME,
      redis: queueConfig.redis,
    }),
  ],
  providers: [QueueService, ProcessorService],
  exports: [QueueService],
})
export class QueueModule {}
