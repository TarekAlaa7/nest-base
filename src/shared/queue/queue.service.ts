import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUE_NAME, GENERIC_TASK } from '../constants/queue.constants';

@Injectable()
export class QueueService {
  constructor(@InjectQueue(QUEUE_NAME) private readonly queue: Queue) {}

  async addGenericTask(data: Record<string, any>) {
    await this.queue.add(GENERIC_TASK, data);
  }
}
